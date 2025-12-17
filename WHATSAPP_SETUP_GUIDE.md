# Meta WhatsApp Business API - Complete Setup Guide

This guide will walk you through setting up the Meta WhatsApp Business API for your interior design consultation form.

## 📋 What You'll Get

- ✅ Send automated greeting messages to clients via WhatsApp
- ✅ Receive client consultation details on your WhatsApp
- ✅ 1,000 free conversations per month
- ✅ Professional template messages

---

## 🚀 Step-by-Step Setup

### Step 1: Create Meta Business Account

1. **Go to Meta Business Suite**

   - Visit: https://business.facebook.com/
   - Click "Create Account"
   - Enter your business name: "SMHD Interiors" (or your business name)
   - Enter your business details
   - Click "Submit"

2. **Verify Your Business Email**
   - Check your email for verification link
   - Click the verification link

---

### Step 2: Set Up WhatsApp Business

1. **Access Meta Business Settings**

   - Go to: https://business.facebook.com/settings
   - On left sidebar, find "Accounts" → "WhatsApp Accounts"
   - Click "Add" → "Create a WhatsApp Business Account"

2. **Choose Your WhatsApp Number**

   **Option A: Use Your Existing Number** (Recommended)

   - Click "Use an existing WhatsApp Business number"
   - Enter your WhatsApp Business phone number
   - You'll receive a verification code via WhatsApp
   - Enter the code

   **Option B: Get a New Number**

   - Click "Add phone number"
   - Follow Meta's instructions to get a business number
   - Note: May require business verification first

3. **Complete WhatsApp Account Setup**
   - Enter business name: "SMHD Interiors"
   - Select category: "Home Improvement"
   - Add business description (optional)
   - Click "Next"

---

### Step 3: Create a WhatsApp Business App

1. **Go to Meta for Developers**

   - Visit: https://developers.facebook.com/
   - Click "My Apps" (top right)
   - Click "Create App"

2. **Select App Type**

   - Choose "Business"
   - Click "Next"

3. **Fill App Details**

   - **App Name**: "SMHD Interiors Consultation"
   - **App Contact Email**: Your email
   - **Business Account**: Select your business account
   - Click "Create App"

4. **Add WhatsApp Product**
   - In your app dashboard, find "Add Products"
   - Find "WhatsApp" and click "Set Up"
   - Select your business account
   - Click "Continue"

---

### Step 4: Get Your API Credentials

1. **Get Phone Number ID**

   - In WhatsApp dashboard, go to "API Setup"
   - Under "Send and receive messages", you'll see:
     - **Phone number ID** (looks like: 123456789012345)
   - **Copy this number** - you'll need it for `.env.local`

2. **Get Temporary Access Token**

   - On the same page, click "Generate Access Token"
   - **Copy the token** (starts with "EAAA...")
   - ⚠️ This is temporary (24 hours) - we'll create a permanent one later

3. **Test the Connection**
   - On the API Setup page, you'll see a test section
   - Enter your personal WhatsApp number (with country code, no +)
   - Click "Send Message"
   - You should receive a "Hello World" message on WhatsApp
   - ✅ If you received it, API is working!

---

### Step 5: Create Permanent Access Token

1. **Go to System Users**

   - In Meta Business Settings: https://business.facebook.com/settings/system-users
   - Click "Add" → "Add System User"
   - Name: "SMHD WhatsApp API"
   - Role: "Admin"
   - Click "Create System User"

2. **Generate Token**

   - Click on the system user you just created
   - Click "Generate New Token"
   - Select your WhatsApp app
   - Check these permissions:
     - ✅ `whatsapp_business_messaging`
     - ✅ `whatsapp_business_management`
   - Click "Generate Token"
   - **Copy and save this token securely** - you can't see it again!

3. **Assign WhatsApp Account to System User**
   - In Business Settings → WhatsApp Accounts
   - Click your WhatsApp account
   - Click "Add People"
   - Select your system user
   - Give "Full control" permission
   - Click "Save"

---

### Step 6: Configure Your Project

1. **Copy `.env.example` to `.env.local`**

   ```bash
   cp .env.example .env.local
   ```

2. **Edit `.env.local` with your credentials:**

   ```env
   # From Step 4 - Phone Number ID
   WHATSAPP_PHONE_NUMBER_ID=123456789012345

   # From Step 5 - Permanent Access Token
   WHATSAPP_ACCESS_TOKEN=EAAAxxxxxxxxxxxxxxxxx

   # Your personal WhatsApp number (country code + number, no + or spaces)
   # Example for India: 919876543210
   OWNER_WHATSAPP_NUMBER=919876543210

   # Template name (keep as hello_world for now)
   WHATSAPP_TEMPLATE_NAME=hello_world
   ```

3. **Save the file**

---

### Step 7: Test Your Integration

1. **Start your development server:**

   ```bash
   npm run dev
   ```

2. **Open your website:**

   ```
   http://localhost:3000
   ```

3. **Test the consultation form:**

   - Click "Get a Free Consultation"
   - Fill in the form with test data
   - Use a real phone number (yours or a test number)
   - Click "Book a Free Consultation"

4. **Check WhatsApp:**

   - Client number should receive "Hello World" template message
   - Your owner number should receive client details

5. **If it works:** ✅ Integration successful!
6. **If it doesn't work:** See troubleshooting below

---

### Step 8: Create Custom Message Template (Optional but Recommended)

The default "Hello World" template is generic. Create a custom template:

1. **Go to WhatsApp Manager**

   - Visit: https://business.facebook.com/wa/manage/message-templates/
   - Click "Create Template"

2. **Fill Template Details**

   - **Template Name**: `consultation_greeting` (lowercase, underscores only)
   - **Category**: "Utility"
   - **Languages**: English
   - **Click "Continue"**

3. **Design Your Template**

   **Header** (Optional):

   - Type: Text
   - Content: "🏠 SMHD Interiors"

   **Body** (Required):

   ```
   Hello {{1}},

   Thank you for requesting a free design consultation! 🎨

   We've received your details and our design team will contact you shortly to discuss your {{2}} interior design project.

   Looking forward to creating your dream space!

   Best regards,
   SMHD Interiors Team
   ```

   **Footer** (Optional):

   ```
   Design it your way, but for less
   ```

   **Buttons** (Optional):

   - Add a "Call Us" button with your phone number

4. **Submit for Approval**

   - Click "Submit"
   - Meta will review it (usually 15 minutes - 24 hours)
   - You'll get an email when approved

5. **Update Your Code**

   After approval, update `.env.local`:

   ```env
   WHATSAPP_TEMPLATE_NAME=consultation_greeting
   ```

6. **Update API Route** (if using variables)

   In `app/api/whatsapp/send/route.ts`, line ~95:

   ```typescript
   templateParams: [name, propertyType]; // Matches {{1}} and {{2}}
   ```

---

## 🔍 Troubleshooting

### Issue: "WhatsApp credentials not configured"

**Solution:**

- Check `.env.local` exists and has correct values
- Restart your dev server after adding `.env.local`
- Run: `npm run dev`

### Issue: "Error sending to client"

**Solutions:**

- Verify client phone number has WhatsApp
- Ensure phone number format: country code + number (no + or spaces)
- Example: `919876543210` not `+91 98765 43210`

### Issue: "Template not found"

**Solutions:**

- If using custom template, ensure it's approved
- Check template name matches exactly (case-sensitive)
- Use `hello_world` as fallback

### Issue: "Owner doesn't receive messages"

**Solutions:**

- Check `OWNER_WHATSAPP_NUMBER` in `.env.local`
- Ensure it's the same number linked to your WhatsApp Business
- Format: country code + number (e.g., `919876543210`)

### Issue: Token expired

**Solution:**

- System user tokens are permanent (don't expire)
- Temporary tokens expire in 24 hours
- Use Step 5 to create permanent token

### Issue: "Rate limit exceeded"

**Solution:**

- Free tier: 1,000 conversations/month
- Each 24-hour window = 1 conversation
- Upgrade your WhatsApp Business account if needed

---

## 📊 Monitor Usage

1. **View Analytics:**

   - Go to: https://business.facebook.com/wa/manage/home/
   - Click "Analytics"
   - See message counts, delivery rates

2. **Check Billing:**
   - Go to: https://business.facebook.com/settings/whatsapp-business-accounts
   - Click your account → "Billing"
   - Free: 1,000 conversations/month
   - After that: ~$0.005-0.03 per conversation

---

## 🔒 Security Best Practices

1. **Never commit `.env.local` to Git**

   - It's already in `.gitignore`
   - Never share your access token publicly

2. **Rotate Tokens Regularly**

   - Generate new system user tokens every 90 days
   - Revoke old tokens

3. **Monitor API Usage**
   - Check for unusual activity in Meta Business Suite
   - Set up usage alerts

---

## 📱 Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. **Add Environment Variables** in your hosting dashboard:

   ```
   WHATSAPP_PHONE_NUMBER_ID
   WHATSAPP_ACCESS_TOKEN
   OWNER_WHATSAPP_NUMBER
   WHATSAPP_TEMPLATE_NAME
   ```

2. **Verify Business (Required for Production)**

   - Meta requires business verification for production use
   - Go to: https://business.facebook.com/settings/security
   - Click "Start Verification"
   - Upload: Business license, utility bill, or tax document
   - Wait 1-3 business days for approval

3. **Upgrade Account (if needed)**
   - Free tier sufficient for most small businesses
   - Upgrade if you need >1,000 conversations/month

---

## 🎯 Next Steps

1. ✅ Complete Steps 1-7 above
2. ✅ Test with real phone numbers
3. ✅ Create custom message template (Step 8)
4. ✅ Deploy to production
5. ✅ Verify business (for production)
6. ✅ Monitor analytics

---

## 📞 Need Help?

- **Meta Support:** https://business.facebook.com/business/help
- **WhatsApp Business API Docs:** https://developers.facebook.com/docs/whatsapp
- **Community:** https://developers.facebook.com/community/

---

## ✨ You're All Set!

Your consultation form now sends professional WhatsApp messages automatically! 🎉
