# Deploying SIMO API to Azure App Service (Free Tier)

This project is now configured for deployment to Azure App Service. The recommended "least expensive" option is the **Free (F1)** tier.

## Prerequisites
- An Azure Account (free to sign up).
- Azure CLI installed (optional, but helpful) or use the Azure Portal.
- GitHub repository connected to your code.

## Steps to Deploy

### 1. Create an Azure App Service
1. Log in to the [Azure Portal](https://portal.azure.com).
2. Search for **"App Services"** and click **Create** -> **Web App**.
3. **Basics Tab**:
   - **Subscription**: Select your subscription.
   - **Resource Group**: Create a new one (e.g., `simo-api-rg`).
   - **Name**: Enter a unique name (e.g., `simo-api-proxy`).
   - **Publish**: Select **Code**.
   - **Runtime stack**: Select **Node 18 LTS** (or 20 LTS).
   - **Operating System**: **Linux** is recommended for Node.js, but **Windows** works too (we added a `web.config` just in case). Linux is often faster to start.
   - **Region**: Select a region close to you (e.g., East US).
   - **Pricing Plan**:
     - Click **Explore pricing plans**.
     - Select **Free F1** (Shared infrastructure). This is free forever.
4. Click **Review + create** and then **Create**.

### 2. Configure Deployment
1. Once the resource is created, go to the resource page.
2. In the left menu, look for **Deployment** -> **Deployment Center**.
3. **Source**: Select **GitHub**.
4. Authorize Azure to access your GitHub account.
5. Select your **Organization**, **Repository** (`simo-api`), and **Branch** (`main`).
6. Click **Save**.
7. Azure will automatically set up a GitHub Action to build and deploy your app.

### 3. Configuration (Environment Variables)
1. In the left menu, go to **Settings** -> **Environment variables**.
2. Add the following app settings if you need to override defaults:
   - `TARGET_URL`: `https://simo.cnsc.gov.co` (This is already the default in code, so strictly optional).
3. Click **Apply**.

### 4. Verification
1. Go to the **Overview** page and click the **Default domain** URL (e.g., `https://simo-api-proxy.azurewebsites.net`).
2. You should see the message: `SIMO API Proxy Running`.
3. Test an endpoint: `https://simo-api-proxy.azurewebsites.net/empleos` (this might return an error from SIMO if no query params are provided, but it confirms the proxy is working).

## Troubleshooting
- **Logs**: Go to **Monitoring** -> **Log stream** to see live server logs.
- **Startup Errors**: If the app fails to start, check the logs. Ensure `package.json` has `"start": "node index.js"`.
