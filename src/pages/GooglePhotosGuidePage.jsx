export default function GooglePhotosGuidePage() {
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
          downloading them to your phone unlocks the full experience.
        </p>

        <div className="bg-blue-50 rounded-lg px-5 py-4 mb-10 text-left border border-blue-200">
          <p className="text-[15px] text-blue-900 font-medium mb-1">
            Why do I need to download?
          </p>
          <p className="text-[14px] text-blue-800">
            Ember scans your photo library directly on your device to detect travel,
            milestones, holidays, and everyday moments. Photos stored only in the cloud
            aren't visible to the scan. Once downloaded, they appear in your gallery
            and Ember can find the stories in them.
          </p>
        </div>

        {/* ── Option A: Google Photos App ── */}

        <div className="h-px bg-border mb-8" />

        <div className="flex items-center justify-center gap-3 mb-6">
          <svg viewBox="0 0 24 24" className="w-7 h-7 shrink-0">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#4285F4" fillOpacity="0.15"/>
            <path d="M12 7.5V2.05c-.3-.03-.6-.05-.9-.05-2.3 0-4.4.8-6.1 2.1L9.5 12 12 7.5z" fill="#F44336"/>
            <path d="M12 7.5L14.5 12l4.4-7.9C17.2 2.8 15.1 2 12.9 2c-.3 0-.6.02-.9.05V7.5z" fill="#FBBC04"/>
            <path d="M14.5 12l4.4-7.9c-.3-.2-.6-.4-.9-.5L12 12h2.5z" fill="#FBBC04" fillOpacity="0.6"/>
            <path d="M5 12H2c0 2.3.8 4.4 2.1 6.1L9.5 12H5z" fill="#4285F4"/>
            <path d="M9.5 12L5 12 4.1 13.9c.1.3.3.6.5.9L12 12H9.5z" fill="#4285F4" fillOpacity="0.6"/>
            <path d="M12 16.5L9.5 12l-5.4 6.1C5.8 19.4 7.7 20.5 9.9 20.9L12 16.5z" fill="#34A853"/>
            <path d="M12 16.5v5.45c.3.03.6.05.9.05 2.2 0 4.1-1.1 5.5-2.4L12 16.5z" fill="#0D652D"/>
            <path d="M14.5 12L12 16.5l6.4 3.1c1.3-1.7 2.1-3.8 2.1-6.1h-3.5L14.5 12z" fill="#188038"/>
          </svg>
          <h2 className="text-[24px] font-semibold text-foreground">
            Option A: From Google Photos App
          </h2>
        </div>

        <p className="text-muted-foreground text-[17px] mb-8">
          This is the simplest way. Select the photos or albums you want, and download them straight to your phone.
        </p>

        <StepCard number={1} title="Open Google Photos">
          <p className="text-muted-foreground text-[17px]">
            Open the <strong className="text-foreground">Google Photos</strong> app on your Android phone. If you don't have it installed, you can get it from the Play Store.
          </p>
        </StepCard>

        <StepCard number={2} title="Select your photos">
          <p className="text-muted-foreground text-[17px] mb-3">
            You can select individual photos or entire albums. For the best Ember experience, start with photos from:
          </p>
          <ul className="text-muted-foreground text-[17px] list-disc list-inside space-y-1 mb-3">
            <li><strong className="text-foreground">Trips and vacations</strong> — Ember's travel detection works best with these</li>
            <li><strong className="text-foreground">Holidays and birthdays</strong> — seasonal celebrations and milestones</li>
            <li><strong className="text-foreground">Everyday family moments</strong> — local stories from daily life</li>
          </ul>
          <div className="bg-background rounded-md px-4 py-3 border border-border mt-3">
            <p className="text-[14px] text-muted-foreground">
              <strong className="text-foreground">Tip:</strong> Long-press a photo to start selecting, then drag to select many at once. Or open an album and tap the three-dot menu to select all photos in it.
            </p>
          </div>
        </StepCard>

        <StepCard number={3} title='Tap "Download"'>
          <p className="text-muted-foreground text-[17px] mb-3">
            With your photos selected, tap the <strong className="text-foreground">three-dot menu</strong> (top right) and choose <strong className="text-foreground">Download</strong>.
          </p>
          <p className="text-muted-foreground text-[17px]">
            The photos will be saved to your device's gallery. This may take a few moments depending on how many you selected.
          </p>
          <div className="bg-amber-50 rounded-md px-4 py-3 border border-amber-200 mt-3">
            <p className="text-[14px] text-amber-900">
              <strong>Storage note:</strong> Make sure you have enough free space on your device.
              Each photo is typically 2-5 MB. 500 photos would need about 1-2.5 GB.
              Once your stories are saved to Ember, you can delete the downloaded photos
              from your phone to reclaim the space.
            </p>
          </div>
        </StepCard>

        <StepCard number={4} title="Return to Ember">
          <p className="text-muted-foreground text-[17px] mb-3">
            Open Ember and pull down to refresh on the home screen, or tap <strong className="text-foreground">Scan for Stories</strong> if you see the option.
            Ember will detect the new photos and start finding stories.
          </p>
          <p className="text-muted-foreground text-[17px]">
            Story detection usually takes under a minute. You'll see new story candidates appear in your home screen rail.
          </p>
        </StepCard>

        {/* ── Option B: Google Drive ── */}

        <div className="h-px bg-border my-[48px]" />

        <div className="flex items-center justify-center gap-3 mb-6">
          <svg viewBox="0 0 24 24" className="w-7 h-7 shrink-0">
            <path d="M8.267 14.68l-1.6 2.77H22l1.6-2.77z" fill="#0066DA"/>
            <path d="M15.333 2H8.267l-6.4 11.08 1.6 2.77L8.8 7.08h6.533z" fill="#00AC47"/>
            <path d="M21.733 13.08L15.333 2l-5.6 9.69 1.6 2.77 4.533-7.85 4.267 7.39z" fill="#EA4335"/>
            <path d="M8.267 14.68l3.2-5.54L8.8 7.08 1.867 13.08l1.6 2.77z" fill="#00832D"/>
            <path d="M15.333 2L8.8 7.08l2.667 2.06L15.333 2z" fill="#2684FC"/>
            <path d="M22 17.45H6.667l1.6-2.77H22z" fill="#0066DA" fillOpacity="0.8"/>
          </svg>
          <h2 className="text-[24px] font-semibold text-foreground">
            Option B: From Google Drive
          </h2>
        </div>

        <p className="text-muted-foreground text-[17px] mb-8">
          If you have photos stored in Google Drive (not just Google Photos), you can download those too.
        </p>

        <StepCard number={1} title="Open Google Drive">
          <p className="text-muted-foreground text-[17px]">
            Open the <strong className="text-foreground">Google Drive</strong> app on your phone and navigate to the folder containing your photos.
          </p>
        </StepCard>

        <StepCard number={2} title="Select and download">
          <p className="text-muted-foreground text-[17px] mb-3">
            Long-press a file to start selecting, then tap additional files. Tap the <strong className="text-foreground">three-dot menu</strong> and choose <strong className="text-foreground">Download</strong>.
          </p>
          <p className="text-muted-foreground text-[17px]">
            Downloaded photos will appear in your device's gallery automatically.
          </p>
        </StepCard>

        <StepCard number={3} title="Return to Ember">
          <p className="text-muted-foreground text-[17px]">
            Same as above — open Ember, pull to refresh, and your new photos will be included in the next scan.
          </p>
        </StepCard>

        {/* ── Other Cloud Services ── */}

        <div className="h-px bg-border my-[48px]" />

        <h2 className="text-[24px] font-semibold mb-4 text-foreground">
          Other Cloud Services
        </h2>

        <p className="text-muted-foreground text-[17px] mb-6">
          The same approach works with any cloud storage. If you have photos in
          Dropbox, OneDrive, iCloud, or another service, download them to your device
          and Ember will include them in the next scan.
        </p>

        <div className="bg-muted rounded-lg border border-border py-4 px-4 mb-8 text-left">
          <p className="text-muted-foreground text-[17px] mb-3">
            The general steps are the same for any service:
          </p>
          <ol className="text-muted-foreground text-[17px] list-decimal list-inside space-y-2">
            <li>Open the cloud app on your phone</li>
            <li>Select the photos you want</li>
            <li>Download them to your device</li>
            <li>Return to Ember and pull to refresh</li>
          </ol>
          <p className="text-muted-foreground text-[14px] mt-3">
            Any photo file downloaded to your device (JPEG, PNG, HEIC) automatically appears in your gallery
            and becomes scannable by Ember — including location data for travel detection.
          </p>
        </div>

        {/* ── FAQ ── */}

        <div className="h-px bg-border my-[48px]" />

        <h2 className="text-[22px] font-semibold mb-6 text-foreground">
          Common Questions
        </h2>

        <div className="text-left space-y-6 mb-12">
          <FaqItem question="Will this use a lot of storage on my phone?">
            It depends on how many photos you download. A typical photo is 2-5 MB.
            You don't need to download your entire library — start with a few hundred
            photos from your favorite trips or events, and Ember can find stories in those.
          </FaqItem>

          <FaqItem question="Do I need to keep the photos on my phone permanently?">
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

function StepCard({ number, title, children }) {
  return (
    <div className="bg-muted rounded-lg border border-border py-4 px-4 mb-8 text-left">
      <p className="text-sm font-extrabold uppercase tracking-widest text-primary mb-1">
        Step {number}
      </p>
      <h2 className="text-[20px] font-semibold mb-3 text-foreground">
        {title}
      </h2>
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
