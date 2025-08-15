from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    page.goto("http://localhost:3000")

    page.set_viewport_size({"width": 1280, "height": 1080})

    heading = page.locator('h2:has-text("文化と探求")')

    heading.scroll_into_view_if_needed()

    page.wait_for_timeout(500)

    page.screenshot(path="jules-scratch/verification/asanoha_verification_v2.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
