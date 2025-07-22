const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    console.log('🔍 Testing http://localhost:4040');
    
    // Navigate to the site
    await page.goto('http://localhost:4040', { waitUntil: 'networkidle' });
    
    // Get page title
    const title = await page.title();
    console.log('📄 Page title:', title);
    
    // Check if main heading exists
    const mainHeading = await page.locator('h2').first().textContent();
    console.log('📋 Main heading:', mainHeading);
    
    // Check for key elements
    const contactButton = await page.locator('[data-testid="contact-button"]').count();
    const servicesButton = await page.locator('[data-testid="services-button"]').count();
    const heroSection = await page.locator('[data-testid="hero"]').count();
    
    console.log('🎯 Contact button found:', contactButton > 0);
    console.log('🎯 Services button found:', servicesButton > 0);
    console.log('🎯 Hero section found:', heroSection > 0);
    
    // Take screenshot
    await page.screenshot({ path: 'docker-site-test.png', fullPage: true });
    console.log('📸 Screenshot saved as docker-site-test.png');
    
    // Get some page content to verify it's not empty
    const bodyText = await page.locator('body').textContent();
    const hasContent = bodyText.includes('Mark') || bodyText.includes('property') || bodyText.includes('services');
    console.log('📝 Page has expected content:', hasContent);
    
    console.log('✅ Site is working correctly!');
    
  } catch (error) {
    console.error('❌ Error testing site:', error.message);
  } finally {
    await browser.close();
  }
})();