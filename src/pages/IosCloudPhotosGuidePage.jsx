export default function IosCloudPhotosGuidePage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans leading-relaxed">
      <div className="max-w-[720px] mx-auto px-6 py-[60px] pb-20 text-center">

        <img
          src="/assets/brand/EmberLogo-Vert-BlackTxt.svg"
          alt="Ember Stories"
          className="h-28 mx-auto mb-10"
        />

        <h1 className="text-[32px] font-semibold mb-4 tracking-[-0.5px] text-foreground">
          Get your cloud photos into Ember
        </h1>

        <p className="text-lg text-foreground mb-6">
          Ember finds stories in photos stored on your device.
          If your photos live in Google Photos, Google Drive, or another cloud service,
          downloading them to your iPhone unlocks the full experience.
        </p>

        {/* ── Accordion Sections ── */}

        <div className="space-y-3 mb-12">
          <AccordionSection
            title="Google Photos"
            icon={<GooglePhotosIcon />}
          >
            <p className="text-muted-foreground text-[17px] mb-6">
              Select the photos or albums you want, and save them to your iPhone.
            </p>

            <Step number={1} title="Open Google Photos">
              <p className="text-muted-foreground text-[17px]">
                Open the <strong className="text-foreground">Google Photos</strong> app on your iPhone. If you don't have it installed, you can get it from the App Store.
              </p>
            </Step>

            <hr className="border-border my-6" />

            <Step number={2} title="Select your photos">
              <p className="text-muted-foreground text-[17px] mb-3">
                You can select individual photos or entire albums. For the best Ember experience, start with photos from:
              </p>
              <ul className="text-muted-foreground text-[17px] list-disc list-inside space-y-1 mb-3">
                <li><strong className="text-foreground">Trips and vacations</strong> — Ember's travel detection works best with these</li>
                <li><strong className="text-foreground">Holidays and birthdays</strong> — seasonal celebrations and milestones</li>
                <li><strong className="text-foreground">Everyday family moments</strong> — local stories from daily life</li>
              </ul>
              <p className="text-[14px] text-muted-foreground mt-3">
                <strong className="text-foreground">Tip:</strong> Tap and hold a photo to start selecting, then drag to select many at once. Or open an album and tap the three-dot menu to select all.
              </p>
            </Step>

            <hr className="border-border my-6" />

            <Step number={3} title="Save to your device">
              <p className="text-muted-foreground text-[17px] mb-3">
                With your photos selected, tap the <strong className="text-foreground">share icon</strong> and choose <strong className="text-foreground">Save to Device</strong> (or <strong className="text-foreground">Save Items</strong>).
              </p>
              <p className="text-muted-foreground text-[17px]">
                The photos will be saved to your Camera Roll. This may take a few moments depending on how many you selected.
              </p>
              <div className="bg-amber-50 rounded-md px-3 py-2.5 border border-amber-200 mt-3">
                <p className="text-[14px] text-amber-900">
                  <strong>Storage note:</strong> Each photo is typically 2-5 MB. 500 photos would need about 1-2.5 GB.
                  Once your stories are saved to Ember, you can delete the downloads to reclaim space.
                </p>
              </div>
            </Step>

            <hr className="border-border my-6" />

            <Step number={4} title="Return to Ember">
              <p className="text-muted-foreground text-[17px]">
                Open Ember and pull down to refresh on the home screen, or tap <strong className="text-foreground">Scan for Stories</strong> if you see the option.
                Story detection usually takes under a minute.
              </p>
            </Step>
          </AccordionSection>

          <AccordionSection
            title="Google Drive"
            icon={<GoogleDriveIcon />}
          >
            <p className="text-muted-foreground text-[17px] mb-6">
              If you have photos stored in Google Drive, you can download those too.
            </p>

            <Step number={1} title="Open Google Drive">
              <p className="text-muted-foreground text-[17px]">
                Open the <strong className="text-foreground">Google Drive</strong> app on your iPhone and navigate to the folder containing your photos.
              </p>
            </Step>

            <hr className="border-border my-6" />

            <Step number={2} title="Save to your device">
              <p className="text-muted-foreground text-[17px]">
                Tap the three-dot menu on a file and choose <strong className="text-foreground">Send a copy</strong>, then <strong className="text-foreground">Save Image</strong>.
                For multiple files, select them first, then use the share menu.
                Saved photos will appear in your Camera Roll.
              </p>
            </Step>

            <hr className="border-border my-6" />

            <Step number={3} title="Return to Ember">
              <p className="text-muted-foreground text-[17px]">
                Open Ember, pull to refresh, and your new photos will be included in the next scan.
              </p>
            </Step>
          </AccordionSection>

          <AccordionSection
            title="iCloud Photos"
            icon={<ICloudIcon />}
          >
            <p className="text-muted-foreground text-[17px] mb-4">
              If your iPhone uses <strong className="text-foreground">iCloud Photos</strong> with <strong className="text-foreground">Optimize iPhone Storage</strong> enabled,
              some photos may be stored in iCloud rather than on your device. Ember can still detect stories from these photos,
              but downloading the originals ensures the best results.
            </p>

            <Step number={1} title='Check your settings'>
              <p className="text-muted-foreground text-[17px]">
                Go to <strong className="text-foreground">Settings</strong> &gt; <strong className="text-foreground">Photos</strong>.
                If <strong className="text-foreground">Optimize iPhone Storage</strong> is selected,
                your device may not have full-resolution copies of all photos.
              </p>
            </Step>

            <hr className="border-border my-6" />

            <Step number={2} title="Download originals">
              <p className="text-muted-foreground text-[17px]">
                Select <strong className="text-foreground">Download and Keep Originals</strong> to download
                full-resolution copies to your device. This may take some time and storage space depending on your library size.
              </p>
              <div className="bg-blue-50 rounded-md px-3 py-2.5 border border-blue-200 mt-3">
                <p className="text-[14px] text-blue-900">
                  <strong>Already set to "Download and Keep Originals"?</strong> Your photos are already
                  on your device — no additional steps needed. Ember can scan them directly.
                </p>
              </div>
            </Step>

            <hr className="border-border my-6" />

            <Step number={3} title="Return to Ember">
              <p className="text-muted-foreground text-[17px]">
                Open Ember and pull to refresh. With originals on your device, Ember can access
                all your photos for story detection.
              </p>
            </Step>
          </AccordionSection>

          <AccordionSection
            title="Other Cloud Services"
            icon={<CloudIcon />}
          >
            <p className="text-muted-foreground text-[17px] mb-4">
              The same approach works with any cloud storage — Dropbox, OneDrive, or any other service.
            </p>

            <ol className="text-muted-foreground text-[17px] list-decimal list-inside space-y-2 mb-4">
              <li>Open the cloud app on your iPhone</li>
              <li>Select the photos you want</li>
              <li>Save them to your Camera Roll</li>
              <li>Return to Ember and pull to refresh</li>
            </ol>

            <p className="text-[14px] text-muted-foreground">
              Any photo saved to your Camera Roll (JPEG, PNG, HEIC) is automatically
              scannable by Ember — including location data for travel detection.
            </p>
          </AccordionSection>
        </div>

        {/* ── FAQ ── */}

        <div className="h-px bg-border my-[48px]" />

        <h2 className="text-[22px] font-semibold mb-6 text-foreground">
          Common Questions
        </h2>

        <div className="text-left space-y-6 mb-12">
          <FaqItem question="Will this use a lot of storage on my iPhone?">
            It depends on how many photos you download. A typical photo is 2-5 MB.
            You don't need to download your entire library — start with a few hundred
            photos from your favorite trips or events, and Ember can find stories in those.
          </FaqItem>

          <FaqItem question="Do I need to keep the photos on my iPhone permanently?">
            No. Once you've approved a story and it's been saved to Ember, the photos are
            stored in your Ember account. You can delete the local copies from your device
            to free up space. Just keep in mind that if you want Ember to find new stories
            from those same photos in the future, they'll need to be on the device again.
          </FaqItem>

          <FaqItem question="Why can't Ember connect directly to cloud services?">
            Google removed the ability for apps to browse your Google Photos library in April 2025.
            Other cloud services have similar restrictions. Downloading photos to your device
            is the most reliable way to use them with photo apps like Ember, and it works
            with any cloud service.
          </FaqItem>

          <FaqItem question="What about my iCloud Photos?">
            If you use iCloud Photos with "Download and Keep Originals" enabled, Ember can
            already scan all your photos. If you use "Optimize iPhone Storage," some photos
            may be stored only in iCloud — Ember can still detect stories from their metadata,
            but downloading originals ensures the best results.
          </FaqItem>

          <FaqItem question="Will Ember detect my travel photos?">
            Yes! Photos downloaded from Google Photos, Google Drive, and most other cloud
            services keep their location data intact. Ember uses this to detect travel
            stories — trips, vacations, and anywhere away from home.
          </FaqItem>

          <FaqItem question="How many photos do I need for a story?">
            It varies by story type. Travel stories typically need 15+ photos from a trip.
            Milestones and holidays can work with fewer. The more photos you have from an
            event, the richer the story.
          </FaqItem>
        </div>

        {/* ── Footer ── */}

        <div className="h-px bg-border mb-8" />
        <p className="text-muted-foreground text-[17px] mb-3">
          Questions or need help?
        </p>
        <p className="text-[19px]">
          <a href="mailto:feedback@emberstories.com" className="text-primary no-underline hover:underline">
            feedback@emberstories.com
          </a>
        </p>

      </div>
    </div>
  )
}

function AccordionSection({ title, icon, defaultOpen = false, children }) {
  return (
    <details open={defaultOpen || undefined} className="group rounded-xl border border-border overflow-hidden text-left">
      <summary className="flex items-center gap-3 px-5 py-4 cursor-pointer select-none bg-background hover:bg-muted transition-colors list-none [&::-webkit-details-marker]:hidden">
        {icon}
        <span className="text-[20px] font-semibold text-foreground flex-1">
          {title}
        </span>
        <svg
          className="w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200 group-open:rotate-180"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </summary>
      <div className="px-4 pb-5 pt-2">
        {children}
      </div>
    </details>
  )
}

function Step({ number, title, children }) {
  return (
    <div className="text-left">
      <p className="text-sm font-extrabold uppercase tracking-widest text-primary mb-1">
        Step {number}
      </p>
      <h3 className="text-[18px] font-semibold mb-2 text-foreground">
        {title}
      </h3>
      {children}
    </div>
  )
}

function FaqItem({ question, children }) {
  return (
    <div>
      <h3 className="text-[17px] font-semibold text-foreground mb-1">
        {question}
      </h3>
      <p className="text-[15px] text-muted-foreground">
        {children}
      </p>
    </div>
  )
}

function GooglePhotosIcon() {
  return (
    <img
      src="/assets/logos/google-photos.svg"
      alt="Google Photos"
      className="w-7 h-7 shrink-0"
    />
  )
}

function GoogleDriveIcon() {
  return (
    <img
      src="/assets/logos/google-drive.svg"
      alt="Google Drive"
      className="w-7 h-7 shrink-0"
    />
  )
}

function ICloudIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6.5 19a4.5 4.5 0 01-.42-8.98A7 7 0 0119.5 11a4.5 4.5 0 01.5 8.97" strokeLinecap="round" strokeLinejoin="round" className="text-[#3b82f6]" />
    </svg>
  )
}

function CloudIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7 shrink-0 text-muted-foreground" fill="currentColor">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z" />
    </svg>
  )
}
