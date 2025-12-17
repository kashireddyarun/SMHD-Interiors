import { NextRequest, NextResponse } from 'next/server'

// WhatsApp Cloud API endpoint
const WHATSAPP_API_URL = 'https://graph.facebook.com/v18.0'

interface SendMessageParams {
  to: string
  templateName?: string
  templateParams?: string[]
  bodyText?: string
}

async function sendWhatsAppMessage({ to, templateName, templateParams, bodyText }: SendMessageParams) {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN

  if (!phoneNumberId || !accessToken) {
    throw new Error('WhatsApp credentials not configured')
  }

  const url = `${WHATSAPP_API_URL}/${phoneNumberId}/messages`

  let messageBody: any

  if (templateName) {
    // Send template message
    messageBody = {
      messaging_product: 'whatsapp',
      to: to,
      type: 'template',
      template: {
        name: templateName,
        language: {
          code: 'en'
        },
        components: templateParams ? [
          {
            type: 'body',
            parameters: templateParams.map(param => ({ type: 'text', text: param }))
          }
        ] : []
      }
    }
  } else if (bodyText) {
    // Send text message (only works within 24hr customer service window)
    messageBody = {
      messaging_product: 'whatsapp',
      to: to,
      type: 'text',
      text: {
        body: bodyText
      }
    }
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messageBody),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`WhatsApp API error: ${error}`)
  }

  return await response.json()
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, propertyType, location } = body

    // Validate required fields
    if (!name || !phone || !propertyType || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const ownerPhone = process.env.OWNER_WHATSAPP_NUMBER

    if (!ownerPhone) {
      return NextResponse.json(
        { error: 'Owner WhatsApp number not configured' },
        { status: 500 }
      )
    }

    // Format phone number (remove any non-digits and ensure it has country code)
    const formatPhone = (phoneNum: string) => {
      const cleaned = phoneNum.replace(/\D/g, '')
      // If doesn't start with country code, assume India (+91)
      return cleaned.startsWith('91') ? cleaned : `91${cleaned}`
    }

    const clientPhone = formatPhone(phone)

    // 1. Send template message to client
    // Note: Replace 'consultation_greeting' with your actual approved template name
    const templateName = process.env.WHATSAPP_TEMPLATE_NAME || 'hello_world'
    
    let clientMessageResult
    let clientMessageError = null
    try {
      clientMessageResult = await sendWhatsAppMessage({
        to: clientPhone,
        templateName: templateName,
        templateParams: [name] // Adjust based on your template structure
      })
    } catch (error: any) {
      console.error('Failed to send client message:', error)
      clientMessageError = error.message
      // Check if it's the "not in allowed list" error (development mode)
      if (error.message.includes('131030') || error.message.includes('not in allowed list')) {
        console.warn('⚠️ WhatsApp API in development mode. Add recipient to allowed list in Meta dashboard.')
      }
      // Continue even if client message fails
    }

    // 2. Send notification to owner with client details
    const ownerMessageText = `🏠 New Consultation Request

👤 Name: ${name}
📱 Phone: +${clientPhone}
🏘️ Property Type: ${propertyType}
📍 Location: ${location}

Please contact the client soon!`

    let ownerMessageResult
    try {
      ownerMessageResult = await sendWhatsAppMessage({
        to: formatPhone(ownerPhone),
        bodyText: ownerMessageText
      })
    } catch (error: any) {
      console.error('Failed to send owner notification:', error)
      // If owner notification fails, still return success for client
    }

    return NextResponse.json({
      success: true,
      message: 'Consultation request submitted successfully',
      clientMessageSent: !!clientMessageResult,
      ownerNotified: !!ownerMessageResult,
      developmentMode: !!clientMessageError && clientMessageError.includes('not in allowed list'),
      note: clientMessageError && clientMessageError.includes('not in allowed list') 
        ? 'WhatsApp is in development mode. Add recipient numbers to allowed list in Meta dashboard to send messages.'
        : undefined
    })

  } catch (error: any) {
    console.error('WhatsApp API error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to send WhatsApp messages',
        details: error.message 
      },
      { status: 500 }
    )
  }
}
