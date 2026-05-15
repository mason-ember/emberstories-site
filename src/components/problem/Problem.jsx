import './problem.css'

// Problem section — emotional thesis + product reveal in a single movement.
// Single-column editorial composition on a warm paper background.
// Source-of-truth copy + structural rationale:
// emberstories-site-kb/planning/site_content/Home/2_Problem.md

export default function Problem() {
  return (
    <section className="problem-section" aria-labelledby="problem-headline">
      <div className="problem-inner">
        <h2 id="problem-headline" className="problem-headline">
          We used to reminisce
        </h2>

        <hr className="problem-rule" aria-hidden="true" />

        <p className="problem-lede">
          We capture more of our lives than any generation before us —
          birthdays, vacations, holidays, weekend fun. Our phones are full of
          moments our parents would have framed or added to photo albums. Yet
          somehow, they feel distant — like files rather than memories.
        </p>

        <div className="problem-dyad">
          <div className="problem-dyad-side problem-dyad-problem">
            <h3 className="problem-subhead">Cloud storage preserves photos</h3>
            <p>
              Our phones and cloud services do a remarkable job preserving our
              photos. But somewhere along the way, the stories began to
              disappear — fragmented across devices, buried in endless
              scrolling, reduced to isolated files instead of shared family
              narratives.
            </p>
          </div>
          <div className="problem-dyad-side problem-dyad-answer">
            <h3 className="problem-subhead">Ember preserves stories</h3>
            <p>
              Ember turns your photos back into stories — the kind you used to
              tell. And because the best memories are shared, Ember identifies
              photos from those who were there with you — weaving them into a
              single, shared story.
            </p>
          </div>
        </div>

        <hr className="problem-rule" aria-hidden="true" />

        <div className="problem-coda">
          <p className="problem-fragments">
            Family vacations.<br />
            Christmas mornings.<br />
            Birthday parties.<br />
            Weekend games.
          </p>
          <p className="problem-closing">
            Stories your household can relive together.
          </p>
        </div>
      </div>
    </section>
  )
}
