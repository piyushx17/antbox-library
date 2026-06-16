import { readFile, writeFile } from 'node:fs/promises';

const source = new URL('../public/index.html', import.meta.url);
const target = new URL('../public/aptitude.html', import.meta.url);

let html = await readFile(source, 'utf8');

const aptitudeMain = String.raw`
<header class="hero">
  <div class="wrap">
    <div class="hero-top">
      <a href="/" class="brand-logo" aria-label="Antbox"><img src="/assets/antbox-logo-cropped.png" alt="Antbox"></a>
      <div class="hero-meta">
        <span>Pre-Read · Aptitude Vault</span>
      </div>
    </div>
    <div class="hero-eyebrow">Campus Placement · Capsule Prep</div>
    <h1>The <span class="accent">90 patterns</span> you need to crack any aptitude test.</h1>
    <p class="hero-sub">This is the working logic of quantitative aptitude: number systems, percentages, ratios, averages, interest, profit-loss, time-work, pipes, probability, and fast reference tables. Not a coaching class. A reference you'll pull up when you blank on a formula mid-mock-test.</p><div class="hero-actions"><button id="hero-ask-ant" class="hero-action" type="button">Ask Ant</button><a class="hero-action secondary" href="#intro">Choose a chapter</a></div>
    <div class="hero-stats">
      <div class="hero-stat"><div class="n">90</div><div class="l">PATTERNS</div></div>
      <div class="hero-stat"><div class="n">10</div><div class="l">CHAPTERS</div></div>
      <div class="hero-stat"><div class="n">60+</div><div class="l">EXAMPLES</div></div>
      <div class="hero-stat"><div class="n">12</div><div class="l">CHEAT CARDS</div></div>
    </div>
    <div id="name-suggestion" class="callout aptitude-note">
      <button class="note-close" type="button" aria-label="Dismiss">×</button>
      <div class="label">Name idea</div>
      <p>This book lives inside <strong>The antBox Library</strong>. We're calling the book <strong>Aptitude Vault</strong>; other options are Quant Capsule, Pattern Bank, and The 80 Patterns.</p>
    </div>
  </div>
</header>

<section class="section" id="intro">
  <div class="wrap">
    <div class="section-head">
      <div class="section-num">PRE-READ INTRO</div>
      <h2>Read this once. Bookmark it forever.</h2>
    </div>
    <div class="prose" style="max-width: 760px;">
      <p>Aptitude is one of the few things where vocabulary <em>is</em> the shortcut. A person who instantly recognises "successive percentage" or "relative speed" will solve the question in 30 seconds. You can't yet, and that's fine. But you should recognise every pattern in this vault by the time you sit your first mock.</p>
      <p>Each section is structured the same way: a tight definition, the formula, worked examples with actual numbers, step-by-step solving, and what to watch for when this shows up in a test.</p>
    </div>
    <div class="callout">
      <div class="label">A note on Indian placement context</div>
      <p>Most patterns here match TCS NQT, Infosys, Wipro, Accenture, and campus placement formats. Where a pattern is global, it is labelled. Formula variations are noted where exams differ.</p>
    </div>
    <div class="toc">
      <a href="#unit-01"><span>01 · Number Systems & Divisibility</span><span class="n">15</span></a>
      <a href="#unit-02"><span>02 · Simple & Compound Interest</span><span class="n">11</span></a>
      <a href="#unit-03"><span>03 · Percentage Cheatsheet</span><span class="n">6</span></a>
      <a href="#unit-04"><span>04 · Profit & Loss</span><span class="n">10</span></a>
      <a href="#unit-05"><span>05 · Ratio & Proportion</span><span class="n">10</span></a>
      <a href="#unit-06"><span>06 · Averages</span><span class="n">8</span></a>
      <a href="#unit-07"><span>07 · Time & Work</span><span class="n">10</span></a>
      <a href="#unit-08"><span>08 · Pipes & Cisterns</span><span class="n">8</span></a>
      <a href="#unit-09"><span>09 · Probability</span><span class="n">10</span></a>
      <a href="#unit-10"><span>10 · Tables & Quick Memory</span><span class="n">2</span></a>
      <a href="#cheat"><span>Formula Sheet & Cheat Cards</span><span class="n">12</span></a>
    </div>
  </div>
</section>

<section class="section learning-unit" id="unit-01">
  <div class="wrap">
    <div class="section-head">
      <div class="section-num">01</div>
      <h2>Number Systems & Divisibility</h2>
      <p class="lede">The base layer for quant: types of numbers, factors, HCF, LCM, divisibility, remainders, cyclicity, fractions, decimals, surds, and simplification.</p>
    </div>
    <div class="terms">
      <div class="term">
        <div class="term-head"><span class="term-num">001</span><div><h3 class="term-name">Types of Numbers <span class="term-alias">natural, whole, integer, rational, irrational</span></h3></div></div>
        <p class="term-def">Number classification is the first shortcut layer. Natural numbers are counting numbers; whole numbers include zero; integers include negatives; rational numbers can be written as p/q where q is not zero; irrational numbers cannot be written as exact fractions; real numbers include rational and irrational numbers.</p>
        <dl class="term-rows">
          <dt>Formula</dt><dd>Rational number = <strong>p/q</strong>, where q ≠ 0. Real numbers = Rational + Irrational.</dd>
          <dt>Example</dt><dd>Classify -5, 0, 7, 3/4, √5. -5 is integer and real; 0 is whole, integer, rational, real; 7 is natural, whole, integer, rational, real; 3/4 is rational and real; √5 is irrational and real.</dd>
          <dt>Watch for</dt><dd>Zero is a whole number but not a natural number in most placement-test conventions.</dd>
        </dl>
      </div>

      <div class="term">
        <div class="term-head"><span class="term-num">002</span><div><h3 class="term-name">Even & Odd Numbers <span class="term-alias">parity rules</span></h3></div></div>
        <p class="term-def">Even numbers are divisible by 2. Odd numbers are not divisible by 2. Many questions can be solved just by tracking parity instead of calculating the full value.</p>
        <dl class="term-rows">
          <dt>Formula</dt><dd>Even = <strong>2n</strong>. Odd = <strong>2n + 1</strong>.</dd>
          <dt>Example</dt><dd>Find whether 47 + 63 is even or odd. 47 is odd and 63 is odd. Odd + Odd = Even. 47 + 63 = 110, so the answer is <strong>even</strong>.</dd>
          <dt>Watch for</dt><dd>Even × any integer is always even. Odd × Odd is odd.</dd>
        </dl>
      </div>

      <div class="term">
        <div class="term-head"><span class="term-num">003</span><div><h3 class="term-name">Prime & Composite Numbers <span class="term-alias">factor count test</span></h3></div></div>
        <p class="term-def">A prime number has exactly two factors: 1 and itself. A composite number has more than two factors. This matters for HCF, LCM, divisibility, and factor-count questions.</p>
        <dl class="term-rows">
          <dt>Formula</dt><dd>To test n for prime, check divisibility by prime numbers up to <strong>√n</strong>.</dd>
          <dt>Example</dt><dd>Is 29 prime? √29 ≈ 5.38, so check 2, 3, and 5. 29 is not divisible by any of them. Therefore, <strong>29 is prime</strong>.</dd>
          <dt>Watch for</dt><dd>Smallest prime = 2. Only even prime = 2. Smallest composite = 4.</dd>
        </dl>
      </div>

      <div class="term">
        <div class="term-head"><span class="term-num">004</span><div><h3 class="term-name">Factors & Multiples <span class="term-alias">divides exactly vs product</span></h3></div></div>
        <p class="term-def">A factor divides a number exactly. A multiple is a product of a number with an integer. Factor-count questions usually start with prime factorization.</p>
        <dl class="term-rows">
          <dt>Formula</dt><dd>If n = p<sup>a</sup>q<sup>b</sup>r<sup>c</sup>, then total factors = <strong>(a + 1)(b + 1)(c + 1)</strong>.</dd>
          <dt>Example</dt><dd>Find number of factors of 72. 72 = 2³ × 3². Total factors = (3 + 1)(2 + 1) = 4 × 3 = <strong>12</strong>.</dd>
          <dt>Watch for</dt><dd>Do not count multiples when the question asks for factors. "Divides exactly" means factor.</dd>
        </dl>
      </div>

      <div class="term">
        <div class="term-head"><span class="term-num">005</span><div><h3 class="term-name">HCF & LCM <span class="term-alias">highest common factor and least common multiple</span></h3></div></div>
        <p class="term-def">HCF is the largest number that divides all given numbers exactly. LCM is the smallest number divisible by all given numbers.</p>
        <dl class="term-rows">
          <dt>Formula</dt><dd>HCF takes the lowest power of common prime factors. LCM takes the highest power of all prime factors. For two numbers: <strong>HCF × LCM = Product of numbers</strong>.</dd>
          <dt>Example</dt><dd>Two numbers have HCF 12 and LCM 360. If one number is 60, find the other. Other = (12 × 360) / 60 = 4320 / 60 = <strong>72</strong>.</dd>
          <dt>Watch for</dt><dd>"Largest number that divides..." means HCF. "Smallest number divisible by..." means LCM.</dd>
        </dl>
      </div>

      <div class="term">
        <div class="term-head"><span class="term-num">006</span><div><h3 class="term-name">Divisibility Rules <span class="term-alias">quick divisibility checks</span></h3></div></div>
        <p class="term-def">Divisibility rules let you test numbers quickly without long division. These are common in number system, simplification, and remainder questions.</p>
        <dl class="term-rows">
          <dt>Formula</dt><dd>2: last digit even. 3: digit sum divisible by 3. 4: last two digits divisible by 4. 5: last digit 0 or 5. 6: divisible by 2 and 3. 8: last three digits divisible by 8. 9: digit sum divisible by 9. 11: odd-place sum minus even-place sum divisible by 11.</dd>
          <dt>Example</dt><dd>Check if 7425 is divisible by 3 and 9. Digit sum = 7 + 4 + 2 + 5 = 18. Since 18 is divisible by 3 and 9, 7425 is divisible by both <strong>3 and 9</strong>.</dd>
          <dt>Watch for</dt><dd>For 6, both tests must pass: divisible by 2 and by 3.</dd>
        </dl>
      </div>

      <div class="term">
        <div class="term-head"><span class="term-num">007</span><div><h3 class="term-name">Remainder Theorem <span class="term-alias">mod shortcut</span></h3></div></div>
        <p class="term-def">When a number n is divided by d, it can be written as dq + r, where r is the remainder. Mod shortcuts make huge powers manageable.</p>
        <dl class="term-rows">
          <dt>Formula</dt><dd><strong>n = dq + r</strong>. If a ≡ b (mod d), then a<sup>k</sup> ≡ b<sup>k</sup> (mod d).</dd>
          <dt>Example</dt><dd>Find remainder when 7²⁵ is divided by 6. Since 7 ≡ 1 (mod 6), 7²⁵ ≡ 1²⁵ (mod 6). Remainder = <strong>1</strong>.</dd>
          <dt>Watch for</dt><dd>Reduce the base first. Large powers become easy after taking mod.</dd>
        </dl>
      </div>

      <div class="term">
        <div class="term-head"><span class="term-num">008</span><div><h3 class="term-name">Cyclicity of Last Digit <span class="term-alias">power cycles</span></h3></div></div>
        <p class="term-def">Last digits repeat in cycles. Once you know the cycle length, divide the power by the cycle length and use the remainder.</p>
        <dl class="term-rows">
          <dt>Formula</dt><dd>Common cycles: 2 → 2,4,8,6. 3 → 3,9,7,1. 7 → 7,9,3,1. Cycle length is usually 4 for these digits.</dd>
          <dt>Example</dt><dd>Find last digit of 7¹⁰¹. Cycle of 7 is 7, 9, 3, 1. 101 mod 4 = 1. Take the 1st digit in the cycle. Last digit = <strong>7</strong>.</dd>
          <dt>Watch for</dt><dd>If power mod cycle length is 0, take the last digit of the cycle, not the first.</dd>
        </dl>
      </div>

      <div class="term">
        <div class="term-head"><span class="term-num">009</span><div><h3 class="term-name">Finding Number Using HCF & LCM <span class="term-alias">missing number trick</span></h3></div></div>
        <p class="term-def">If HCF, LCM, and one number are known, the other number can be found using the product relation.</p>
        <dl class="term-rows">
          <dt>Formula</dt><dd>For two numbers: <strong>Number 1 × Number 2 = HCF × LCM</strong>.</dd>
          <dt>Example</dt><dd>Two numbers have HCF 6 and LCM 180. One number is 30. Other = (6 × 180) / 30 = 1080 / 30 = <strong>36</strong>.</dd>
          <dt>Watch for</dt><dd>This formula works directly for two numbers. Be careful applying it to three or more numbers.</dd>
        </dl>
      </div>

      <div class="term">
        <div class="term-head"><span class="term-num">010</span><div><h3 class="term-name">Fractions <span class="term-alias">proper, improper, mixed</span></h3></div></div>
        <p class="term-def">A proper fraction has numerator smaller than denominator. An improper fraction has numerator greater than or equal to denominator. Mixed fractions combine a whole number and a proper fraction.</p>
        <dl class="term-rows">
          <dt>Formula</dt><dd>Mixed to improper: <strong>a b/c = (ac + b) / c</strong>.</dd>
          <dt>Example</dt><dd>Convert 3 2/5 into an improper fraction. (3 × 5 + 2) / 5 = (15 + 2) / 5 = <strong>17/5</strong>.</dd>
          <dt>Watch for</dt><dd>Convert mixed fractions before multiplying or dividing; it reduces mistakes.</dd>
        </dl>
      </div>

      <div class="term">
        <div class="term-head"><span class="term-num">011</span><div><h3 class="term-name">Recurring Decimal to Fraction <span class="term-alias">0.333... method</span></h3></div></div>
        <p class="term-def">Recurring decimals can be converted to fractions by assigning x, multiplying by a power of 10, and subtracting to remove the repeating part.</p>
        <dl class="term-rows">
          <dt>Formula</dt><dd>For one repeating digit, let x = 0.aaa..., then 10x - x removes the repetition.</dd>
          <dt>Example</dt><dd>Convert 0.333... into a fraction. Let x = 0.333... Then 10x = 3.333... Subtract: 10x - x = 3.333... - 0.333..., so 9x = 3. x = 3/9 = <strong>1/3</strong>.</dd>
          <dt>Watch for</dt><dd>Use 100x or 1000x if two or three digits repeat.</dd>
        </dl>
      </div>

      <div class="term">
        <div class="term-head"><span class="term-num">012</span><div><h3 class="term-name">Surds <span class="term-alias">root simplification</span></h3></div></div>
        <p class="term-def">Surds are irrational roots left in radical form. Most test questions ask you to simplify them by extracting perfect-square factors.</p>
        <dl class="term-rows">
          <dt>Formula</dt><dd>√a × √b = <strong>√ab</strong>. √a / √b = <strong>√(a/b)</strong>.</dd>
          <dt>Example</dt><dd>Simplify √18. Since 18 = 9 × 2, √18 = √9 × √2 = <strong>3√2</strong>.</dd>
          <dt>Watch for</dt><dd>Always look for the largest perfect-square factor: 4, 9, 16, 25, 36, 49, etc.</dd>
        </dl>
      </div>

      <div class="term">
        <div class="term-head"><span class="term-num">013</span><div><h3 class="term-name">Simplification Tricks <span class="term-alias">BODMAS</span></h3></div></div>
        <p class="term-def">Simplification questions test order of operations and fraction handling. BODMAS prevents wrong sequencing.</p>
        <dl class="term-rows">
          <dt>Formula</dt><dd>BODMAS = Brackets, Orders, Division, Multiplication, Addition, Subtraction.</dd>
          <dt>Example</dt><dd>Simplify 12 + 8 ÷ 4 × 2. First 8 ÷ 4 = 2. Then 2 × 2 = 4. Then 12 + 4 = <strong>16</strong>.</dd>
          <dt>Watch for</dt><dd>Division and multiplication are solved left to right, not always multiplication first.</dd>
        </dl>
      </div>

      <div class="term">
        <div class="term-head"><span class="term-num">014</span><div><h3 class="term-name">Important Shortcuts <span class="term-alias">fast checks</span></h3></div></div>
        <p class="term-def">Number System speed comes from three habits: prime factorization, HCF-LCM product checks, and last digit or remainder shortcuts.</p>
        <dl class="term-rows">
          <dt>Formula</dt><dd>Prime factorization unlocks factor count, HCF, and LCM. Last digit questions use cyclicity. Remainder questions use mod reduction.</dd>
          <dt>Example</dt><dd>Find last digit of 3⁵⁸. Cycle of 3 is 3, 9, 7, 1. 58 mod 4 = 2. The 2nd digit is <strong>9</strong>.</dd>
          <dt>Watch for</dt><dd>Do not calculate huge powers directly. Reduce the base, power, or last digit pattern first.</dd>
        </dl>
      </div>

      <div class="term">
        <div class="term-head"><span class="term-num">015</span><div><h3 class="term-name">Common Mistakes <span class="term-alias">number system traps</span></h3></div></div>
        <p class="term-def">Most errors in this chapter come from mixing definitions or skipping a small condition. Placement tests exploit these traps with close options.</p>
        <dl class="term-rows">
          <dt>Formula</dt><dd>Before solving, identify: type of number, divisibility condition, HCF vs LCM wording, required unit, and whether signs matter.</dd>
          <dt>Example</dt><dd>Question says "largest number that divides 36 and 60 exactly." This is HCF, not LCM. 36 = 2²×3² and 60 = 2²×3×5, so HCF = 2²×3 = <strong>12</strong>.</dd>
          <dt>Watch for</dt><dd>Ignoring integer signs, using wrong cyclic power, mixing HCF and LCM, and wrong unit conversion.</dd>
        </dl>
      </div>
    </div>
  </div>
</section>

<section class="section learning-unit" id="unit-02">
  <div class="wrap">
    <div class="section-head">
      <div class="section-num">02</div>
      <h2>Simple Interest & Compound Interest</h2>
      <p class="lede">Principal, rate, time, amount, linear growth, exponential growth, compounding frequency, doubling time, and the important SI-vs-CI difference formulas.</p>
    </div>
    <div class="terms">
      <div class="term"><div class="term-head"><span class="term-num">016</span><div><h3 class="term-name">Basic Interest Terms <span class="term-alias">P, R, T, SI, CI, A</span></h3></div></div><p class="term-def">Interest questions use a fixed vocabulary. Principal is the original money, rate is annual percentage, time is in years, interest is the extra money earned or paid, and amount is principal plus interest.</p><dl class="term-rows"><dt>Formula</dt><dd>P = Principal, R = Rate per annum, T = Time in years, SI = Simple Interest, CI = Compound Interest, A = Amount.</dd><dt>Example</dt><dd>If ₹5,000 is invested at 12% for 3 years, P = 5000, R = 12, T = 3. Use these values directly in SI or CI formula.</dd><dt>Watch for</dt><dd>Convert months to years before substituting: 6 months = 1/2 year, 9 months = 3/4 year.</dd></dl></div>

      <div class="term"><div class="term-head"><span class="term-num">017</span><div><h3 class="term-name">Simple Interest <span class="term-alias">linear growth</span></h3></div></div><p class="term-def">Simple Interest grows by the same amount every year because interest is always calculated on the original principal.</p><dl class="term-rows"><dt>Formula</dt><dd><strong>SI = (P × R × T) / 100</strong>. Amount = <strong>P + SI</strong>.</dd><dt>Example</dt><dd>P = ₹1000, R = 10%, T = 2 years. SI = (1000 × 10 × 2) / 100 = ₹200. Amount = 1000 + 200 = <strong>₹1200</strong>.</dd><dt>Watch for</dt><dd>In SI, every year's interest is equal. It does not compound.</dd></dl></div>

      <div class="term"><div class="term-head"><span class="term-num">018</span><div><h3 class="term-name">Shortcut Method for SI <span class="term-alias">one-year interest</span></h3></div></div><p class="term-def">For mental math, calculate one year's interest first, then multiply by time.</p><dl class="term-rows"><dt>Formula</dt><dd>Interest for 1 year = <strong>R% of P</strong>. Interest for T years = <strong>T × (R% of P)</strong>.</dd><dt>Example</dt><dd>Find SI on ₹2000 at 5% for 4 years. One-year interest = 5% of 2000 = ₹100. Four-year interest = 4 × 100 = <strong>₹400</strong>.</dd><dt>Watch for</dt><dd>This is fastest when R% of P is easy to calculate.</dd></dl></div>

      <div class="term"><div class="term-head"><span class="term-num">019</span><div><h3 class="term-name">Amount Given at Different Times <span class="term-alias">find P and R under SI</span></h3></div></div><p class="term-def">When two SI amounts are given at different times, their difference gives interest for the gap between those years.</p><dl class="term-rows"><dt>Formula</dt><dd>Extra interest = Later amount − Earlier amount. One-year interest = Extra interest / time gap. P = Earlier amount − interest already earned.</dd><dt>Example</dt><dd>Amount after 3 years = ₹900; after 6 years = ₹1200. Extra interest for 3 years = 1200 − 900 = 300. One-year interest = 300/3 = 100. P = 900 − 300 = ₹600. R = (100/600) × 100 = <strong>16⅔%</strong>.</dd><dt>Watch for</dt><dd>Do not treat the earlier amount as principal. It already includes interest.</dd></dl></div>

      <div class="term"><div class="term-head"><span class="term-num">020</span><div><h3 class="term-name">Time for Money to Double under SI <span class="term-alias">doubling shortcut</span></h3></div></div><p class="term-def">Under simple interest, money doubles when interest earned equals the principal.</p><dl class="term-rows"><dt>Formula</dt><dd>Time to double under SI = <strong>100 / R</strong>.</dd><dt>Example</dt><dd>At what rate will money double in 8 years under SI? 8 = 100/R, so R = 100/8 = <strong>12.5%</strong>.</dd><dt>Watch for</dt><dd>This shortcut is for SI only, not CI.</dd></dl></div>

      <div class="term"><div class="term-head"><span class="term-num">021</span><div><h3 class="term-name">Compound Interest <span class="term-alias">exponential growth</span></h3></div></div><p class="term-def">Compound Interest grows on the principal plus previously earned interest. This is why CI becomes larger than SI over time.</p><dl class="term-rows"><dt>Formula</dt><dd><strong>A = P(1 + R/100)^T</strong>. CI = <strong>A − P</strong>.</dd><dt>Example</dt><dd>P = ₹1000, R = 10%, T = 2. A = 1000(1 + 10/100)² = 1000(1.1)² = 1000 × 1.21 = ₹1210. CI = 1210 − 1000 = <strong>₹210</strong>.</dd><dt>Watch for</dt><dd>CI and SI are equal for 1 year if compounding is annual. Difference starts after that.</dd></dl></div>

      <div class="term"><div class="term-head"><span class="term-num">022</span><div><h3 class="term-name">Half-Yearly & Quarterly Compounding <span class="term-alias">frequency adjustment</span></h3></div></div><p class="term-def">When compounding happens more than once a year, divide the annual rate and multiply the number of time periods.</p><dl class="term-rows"><dt>Formula</dt><dd>Half-yearly: A = <strong>P(1 + R/200)^(2T)</strong>. Quarterly: A = <strong>P(1 + R/400)^(4T)</strong>.</dd><dt>Example</dt><dd>Find amount on ₹10,000 at 8% for 1 year compounded half-yearly. Half-yearly rate = 8/2 = 4%. Periods = 2. A = 10000(1.04)² = 10000 × 1.0816 = <strong>₹10,816</strong>.</dd><dt>Watch for</dt><dd>Students often divide rate but forget to multiply time.</dd></dl></div>

      <div class="term"><div class="term-head"><span class="term-num">023</span><div><h3 class="term-name">Difference Between CI and SI <span class="term-alias">2-year shortcut</span></h3></div></div><p class="term-def">For 2 years, the difference between compound interest and simple interest has a direct formula.</p><dl class="term-rows"><dt>Formula</dt><dd>For 2 years: <strong>CI − SI = P(R/100)²</strong>.</dd><dt>Example</dt><dd>Difference = ₹25 and R = 10%. 25 = P(10/100)² = P/100. Therefore P = <strong>₹2500</strong>.</dd><dt>Watch for</dt><dd>This exact shortcut is for 2 years with annual compounding.</dd></dl></div>

      <div class="term"><div class="term-head"><span class="term-num">024</span><div><h3 class="term-name">When Money Becomes Multiple Times <span class="term-alias">doubling chain</span></h3></div></div><p class="term-def">In compound interest, if money doubles in a fixed period, powers of 2 give higher multiples.</p><dl class="term-rows"><dt>Formula</dt><dd>If money becomes 8 times, then 8 = 2³, so time = <strong>3 × doubling time</strong>.</dd><dt>Example</dt><dd>If money doubles in 6 years under CI, when will it become 8 times? 8 = 2³, so it needs 3 doublings. Time = 3 × 6 = <strong>18 years</strong>.</dd><dt>Watch for</dt><dd>This shortcut assumes the same rate and compounding pattern continues.</dd></dl></div>

      <div class="term"><div class="term-head"><span class="term-num">025</span><div><h3 class="term-name">SI vs CI Comparison <span class="term-alias">linear vs exponential</span></h3></div></div><p class="term-def">Simple Interest grows linearly. Compound Interest grows exponentially. CI is always greater than SI after the first year under annual compounding.</p><dl class="term-rows"><dt>Formula</dt><dd>SI adds the same interest each year. CI adds interest on accumulated amount.</dd><dt>Example</dt><dd>On ₹1000 at 10% for 2 years, SI = ₹200 while CI = ₹210. The difference is ₹10 because second-year CI earns interest on first-year interest.</dd><dt>Watch for</dt><dd>The longer the time, the faster CI pulls away from SI.</dd></dl></div>

      <div class="term"><div class="term-head"><span class="term-num">026</span><div><h3 class="term-name">Interest Shortcuts & Mistakes <span class="term-alias">exam traps</span></h3></div></div><p class="term-def">Interest questions become easy when you identify whether the growth is simple or compound before substituting values.</p><dl class="term-rows"><dt>Formula</dt><dd>For SI: linear growth. For CI: exponential growth. Use the 2-year difference formula when CI − SI is given.</dd><dt>Example</dt><dd>Find SI on ₹5000 at 12% for 3 years. SI = (5000 × 12 × 3)/100 = 180000/100 = <strong>₹1800</strong>. Amount = ₹6800.</dd><dt>Watch for</dt><dd>Convert months to years carefully, and do not use the SI doubling shortcut for CI questions.</dd></dl></div>
    </div>
  </div>
</section>
<section class="section learning-unit" id="unit-03"><div class="wrap"><div class="section-head"><div class="section-num">03</div><h2>Percentage Cheatsheet</h2><p class="lede">Percentage is the language behind discount, profit, ratio change, data interpretation, and comparison questions. First memorise common fractions, then practise converting story language into percent language.</p></div>
<div class="diagram"><div class="diagram-title">Percent Triangle</div><div class="diagram-sub">Part = Percent × Whole</div><div class="diagram-note">If two values are known, cover the unknown: Percent = Part / Whole; Whole = Part / Percent.</div></div>
<div class="terms">
<div class="term"><div class="term-head"><span class="term-num">027</span><div><h3 class="term-name">Percent Meaning <span class="term-alias">per 100</span></h3></div></div><p class="term-def">Percent means out of 100. When you see 25%, read it as 25 out of 100, or 1/4.</p><dl class="term-rows"><dt>Formula</dt><dd>Percent = (part / whole) × 100.</dd><dt>Example</dt><dd>18 marks out of 60 = (18/60) × 100 = 30%.</dd><dt>Study hint</dt><dd>Always ask: what is the whole/base? Most percent mistakes happen when the base changes.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">028</span><div><h3 class="term-name">Core Fraction to Percent <span class="term-alias">3, 4, 5, 6 families</span></h3></div></div><p class="term-def">These conversions make calculations faster because many options are written as percentages.</p><dl class="term-rows"><dt>Formula</dt><dd>1/3 = 33.33%, 2/3 = 66.66%, 1/4 = 25%, 3/4 = 75%, 1/5 = 20%, 1/6 = 16.66%.</dd><dt>Example</dt><dd>If a price falls by 1/4, it falls by 25%.</dd><dt>Study hint</dt><dd>Make flashcards for denominators 3 to 16. Test yourself both directions.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">029</span><div><h3 class="term-name">Seventh, Ninth and Eleventh Fractions <span class="term-alias">recurring percentages</span></h3></div></div><p class="term-def">Placement exams love 1/7, 1/9, and 1/11 style values because they look messy but follow patterns.</p><dl class="term-rows"><dt>Formula</dt><dd>1/7 = 14.28%, 2/7 = 28.56%, 1/9 = 11.11%, 5/9 = 55.55%, 1/11 = 9.09%, 5/11 = 45.45%.</dd><dt>Example</dt><dd>7 out of 11 students passed means 7/11 = 63.63%.</dd><dt>Watch for</dt><dd>Use approximate percentages unless the question asks for exact fraction form.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">030</span><div><h3 class="term-name">Percentage Increase and Decrease <span class="term-alias">change over original</span></h3></div></div><p class="term-def">Increase or decrease is always measured against the original value unless the question clearly changes the base.</p><dl class="term-rows"><dt>Formula</dt><dd>Change % = (change / original) × 100.</dd><dt>Example</dt><dd>Price rises from 500 to 650. Change = 150. Increase % = 150/500 × 100 = 30%.</dd><dt>Watch for</dt><dd>A 20% increase followed by 20% decrease does not return to the original value.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">031</span><div><h3 class="term-name">Successive Percentage Change <span class="term-alias">two changes together</span></h3></div></div><p class="term-def">When two percentage changes happen one after another, use the net change formula instead of adding directly.</p><dl class="term-rows"><dt>Formula</dt><dd>Net change % = a + b + ab/100, where decrease is negative.</dd><dt>Example</dt><dd>Increase 20%, then decrease 10%: 20 - 10 + (20 × -10)/100 = 8% net increase.</dd><dt>Watch for</dt><dd>The second percent is applied on the changed value, not the original value.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">032</span><div><h3 class="term-name">Percent Practice Routine <span class="term-alias">daily drill</span></h3></div></div><p class="term-def">Percentages improve fastest through short daily conversion drills, not long theory sessions.</p><dl class="term-rows"><dt>Practice</dt><dd>Do 20 conversions daily: fraction to percent, percent to fraction, and word problem to formula.</dd><dt>Example</dt><dd>37.5% = 3/8; 12.5% = 1/8; 6.25% = 1/16; 2.5% = 1/40.</dd><dt>Study hint</dt><dd>Say the base out loud before solving: "percent of what?"</dd></dl></div>
</div></div></section>

<section class="section learning-unit" id="unit-04"><div class="wrap"><div class="section-head"><div class="section-num">04</div><h2>Profit & Loss</h2><p class="lede">Cost price, selling price, marked price, discount, false weight, same-selling-price cases, and partnership links.</p></div><div class="terms">
<div class="term"><div class="term-head"><span class="term-num">033</span><div><h3 class="term-name">Basic Terms <span class="term-alias">CP, SP, MP</span></h3></div></div><p class="term-def">Cost Price is what the seller pays. Selling Price is what the buyer pays. Marked Price is the printed price before discount.</p><dl class="term-rows"><dt>Formula</dt><dd>Profit = SP - CP. Loss = CP - SP.</dd><dt>Example</dt><dd>CP = 800 and SP = 920. Profit = 120.</dd><dt>Watch for</dt><dd>Profit and loss percentage are calculated on CP unless stated otherwise.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">034</span><div><h3 class="term-name">Profit and Loss Percentage <span class="term-alias">on cost price</span></h3></div></div><p class="term-def">Percent tells how big the profit or loss is compared with the original cost.</p><dl class="term-rows"><dt>Formula</dt><dd>Profit % = Profit/CP × 100. Loss % = Loss/CP × 100.</dd><dt>Example</dt><dd>CP = 500, SP = 600. Profit % = 100/500 × 100 = 20%.</dd><dt>Watch for</dt><dd>Do not divide profit by SP unless the question explicitly asks that.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">035</span><div><h3 class="term-name">Find CP from SP and Profit <span class="term-alias">reverse percentage</span></h3></div></div><p class="term-def">When SP and profit percent are given, CP is hidden inside the final value.</p><dl class="term-rows"><dt>Formula</dt><dd>CP = SP × 100 / (100 + Profit%).</dd><dt>Example</dt><dd>Profit = 20%, SP = 600. CP = 600 × 100/120 = 500.</dd><dt>Study hint</dt><dd>Think: after profit, CP became 120% of itself.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">036</span><div><h3 class="term-name">Find SP from CP and Loss <span class="term-alias">loss multiplier</span></h3></div></div><p class="term-def">Loss reduces the cost price by the given percentage.</p><dl class="term-rows"><dt>Formula</dt><dd>SP = CP × (1 - Loss%/100).</dd><dt>Example</dt><dd>CP = 800, loss = 25%. SP = 800 × 75/100 = 600.</dd><dt>Watch for</dt><dd>For profit, use 100 + P. For loss, use 100 - L.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">037</span><div><h3 class="term-name">Marked Price and Discount <span class="term-alias">MP to SP</span></h3></div></div><p class="term-def">Discount is a reduction from the marked price, not from the cost price.</p><dl class="term-rows"><dt>Formula</dt><dd>Discount = MP - SP. Discount % = Discount/MP × 100. SP = MP(1 - d/100).</dd><dt>Example</dt><dd>MP = 1000, discount = 20%. SP = 1000 × 0.8 = 800.</dd><dt>Watch for</dt><dd>Profit with discount questions usually need MP → SP → CP.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">038</span><div><h3 class="term-name">Successive Discounts <span class="term-alias">net discount</span></h3></div></div><p class="term-def">Two discounts are applied one after another, so they cannot be directly added.</p><dl class="term-rows"><dt>Formula</dt><dd>Net discount = a + b - ab/100.</dd><dt>Example</dt><dd>Discounts 20% and 10% give 20 + 10 - 2 = 28% net discount.</dd><dt>Watch for</dt><dd>Successive discounts of 20% and 10% are not 30%.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">039</span><div><h3 class="term-name">Profit with Discount <span class="term-alias">MP, discount, profit</span></h3></div></div><p class="term-def">First find SP after discount, then use the profit percentage to find CP.</p><dl class="term-rows"><dt>Example</dt><dd>MP = 1000, discount = 20%, profit = 25%. SP = 800. CP = 800 × 100/125 = 640.</dd><dt>Study hint</dt><dd>Draw the chain: MP → discount → SP → profit relation → CP.</dd><dt>Watch for</dt><dd>Do not apply profit percentage on MP.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">040</span><div><h3 class="term-name">False Weight Problem <span class="term-alias">less weight trick</span></h3></div></div><p class="term-def">If a trader gives less quantity for the price of full quantity, the missing weight becomes hidden profit.</p><dl class="term-rows"><dt>Formula</dt><dd>Profit % = Weight difference / Actual weight used × 100.</dd><dt>Example</dt><dd>Uses 900g instead of 1kg. Profit % = 100/900 × 100 = 11.11%.</dd><dt>Watch for</dt><dd>Actual weight used goes in the denominator.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">041</span><div><h3 class="term-name">Equal Selling Price Case <span class="term-alias">same SP loss</span></h3></div></div><p class="term-def">When two items are sold at the same SP, one at gain a% and one at loss a%, there is always a net loss.</p><dl class="term-rows"><dt>Formula</dt><dd>Net loss % = a²/100.</dd><dt>Example</dt><dd>Gain 20% on one item and loss 20% on another at equal SP gives 20²/100 = 4% loss.</dd><dt>Watch for</dt><dd>Equal percentage gain and loss does not mean no profit-no loss.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">042</span><div><h3 class="term-name">Buy X Get Y Free <span class="term-alias">effective discount</span></h3></div></div><p class="term-def">Free-item offers can be converted to an effective discount percentage.</p><dl class="term-rows"><dt>Formula</dt><dd>Effective discount % = y/(x + y) × 100.</dd><dt>Example</dt><dd>Buy 2 get 1 free = 1/(2+1) × 100 = 33.33% discount.</dd><dt>Study hint</dt><dd>Count total items received, then ask how many were free.</dd></dl></div>
</div></div></section>

<section class="section learning-unit" id="unit-05"><div class="wrap"><div class="section-head"><div class="section-num">05</div><h2>Ratio & Proportion</h2><p class="lede">Ratios compare same-kind quantities. Most questions become easy when you convert every quantity into parts.</p></div><div class="diagram"><div class="diagram-title">Parts Model</div><div class="diagram-sub">Total value ÷ total parts = one part</div><div class="diagram-note">Then multiply one part by each ratio number.</div></div><div class="terms">
<div class="term"><div class="term-head"><span class="term-num">043</span><div><h3 class="term-name">Ratio and Proportion Basics <span class="term-alias">a:b and a/b</span></h3></div></div><p class="term-def">A ratio compares two quantities of the same kind. A proportion says two ratios are equal.</p><dl class="term-rows"><dt>Formula</dt><dd>a:b = a/b. If a:b :: c:d, then a/b = c/d and ad = bc.</dd><dt>Example</dt><dd>2:3 equals 4:6 because 2/3 = 4/6.</dd><dt>Watch for</dt><dd>Convert to the same units before comparing.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">044</span><div><h3 class="term-name">Properties of Ratio <span class="term-alias">scale and inverse</span></h3></div></div><p class="term-def">A ratio can be multiplied or divided by the same number without changing its meaning.</p><dl class="term-rows"><dt>Formula</dt><dd>a:b = ka:kb = a/k:b/k. Inverse ratio = b:a.</dd><dt>Example</dt><dd>6:9 reduces to 2:3 by dividing both terms by 3.</dd><dt>Watch for</dt><dd>Never add or subtract the same number from both sides of a ratio to simplify it.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">045</span><div><h3 class="term-name">Continued Ratio <span class="term-alias">chain ratio</span></h3></div></div><p class="term-def">Continued ratio links more than two quantities by matching the common term.</p><dl class="term-rows"><dt>Formula</dt><dd>If a:b = m:n and b:c = p:q, then make b same using LCM.</dd><dt>Example</dt><dd>a:b = 2:3 and b:c = 4:5. LCM of 3 and 4 is 12, so a:b:c = 8:12:15.</dd><dt>Watch for</dt><dd>The shared term must match before combining ratios.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">046</span><div><h3 class="term-name">Compound Ratio <span class="term-alias">multiply ratios</span></h3></div></div><p class="term-def">Compound ratio multiplies corresponding terms of two ratios.</p><dl class="term-rows"><dt>Formula</dt><dd>(a:b) × (c:d) = ac:bd.</dd><dt>Example</dt><dd>(2:3) × (4:5) = 8:15.</dd><dt>Study hint</dt><dd>Use this when two comparisons happen together.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">047</span><div><h3 class="term-name">Divide a Quantity in Ratio <span class="term-alias">sum given</span></h3></div></div><p class="term-def">If total and ratio are given, first find the value of one part.</p><dl class="term-rows"><dt>Formula</dt><dd>First part = S × a/(a+b). Second part = S × b/(a+b).</dd><dt>Example</dt><dd>Divide 300 in ratio 2:3. Total parts = 5. One part = 60. Parts = 120 and 180.</dd><dt>Watch for</dt><dd>Use total parts, not difference of parts.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">048</span><div><h3 class="term-name">When Difference is Given <span class="term-alias">gap parts</span></h3></div></div><p class="term-def">When difference is given, compare the gap between ratio parts.</p><dl class="term-rows"><dt>Example</dt><dd>a:b = 3:5, difference = 20. Gap = 2 parts = 20, so one part = 10. a = 30, b = 50.</dd><dt>Study hint</dt><dd>If sum is given, add parts. If difference is given, subtract parts.</dd><dt>Watch for</dt><dd>Do not use sum logic for difference questions.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">049</span><div><h3 class="term-name">Three-Term Sum <span class="term-alias">a:b:c</span></h3></div></div><p class="term-def">For three-term ratios, the same parts method works.</p><dl class="term-rows"><dt>Example</dt><dd>a:b:c = 3:4:5 and sum = 240. Total parts = 12. One part = 20. Values are 60, 80, 100.</dd><dt>Watch for</dt><dd>Add all ratio terms before dividing.</dd><dt>Practice</dt><dd>Try sums with 2 terms, then 3 terms, then chain ratios.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">050</span><div><h3 class="term-name">Comparison Type <span class="term-alias">substitution method</span></h3></div></div><p class="term-def">When expressions are given, substitute ratio values directly.</p><dl class="term-rows"><dt>Example</dt><dd>If a:b = 3:2, find (4a+5b):(5a-2b). Substitute a=3, b=2: (12+10):(15-4) = 22:11 = 2:1.</dd><dt>Study hint</dt><dd>Choose small values from the ratio instead of solving equations.</dd><dt>Watch for</dt><dd>Substitute before simplifying.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">051</span><div><h3 class="term-name">Direct and Inverse Variation <span class="term-alias">x proportional y</span></h3></div></div><p class="term-def">Variation tells whether two values move in the same direction or opposite directions.</p><dl class="term-rows"><dt>Formula</dt><dd>Direct: x ∝ y, so x/y = constant. Inverse: x ∝ 1/y, so xy = constant.</dd><dt>Example</dt><dd>More workers means fewer days for same work, so workers and days are inverse.</dd><dt>Watch for</dt><dd>Identify direction before writing the equation.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">052</span><div><h3 class="term-name">Ratio Mistakes <span class="term-alias">units and LCM</span></h3></div></div><p class="term-def">Common mistakes are mixing units, using wrong LCM in chain ratios, and confusing sum with difference.</p><dl class="term-rows"><dt>Checklist</dt><dd>Same units, same shared term, correct total parts, correct base.</dd><dt>Example</dt><dd>2 hours : 30 minutes is not 2:30. Convert 2 hours to 120 minutes, so ratio = 120:30 = 4:1.</dd><dt>Study hint</dt><dd>Write units beside every number until you stop making conversion errors.</dd></dl></div>
</div></div></section>

<section class="section learning-unit" id="unit-06"><div class="wrap"><div class="section-head"><div class="section-num">06</div><h2>Averages</h2><p class="lede">Average questions are total-sum questions wearing simple clothes. Keep track of total sum, number of observations, and the changed value.</p></div><div class="diagram"><div class="diagram-title">Average Balance</div><div class="diagram-sub">Total Sum = Average × Number of Observations</div><div class="diagram-note">For every new average question, convert average back into total sum first.</div></div><div class="terms">
<div class="term"><div class="term-head"><span class="term-num">053</span><div><h3 class="term-name">Average Basic Formula</h3></div></div><p class="term-def">Average is the equal share of all observations.</p><dl class="term-rows"><dt>Formula</dt><dd>Average = Sum of all observations / Number of observations.</dd><dt>Example</dt><dd>Average of 10, 20, 30 = 60/3 = 20.</dd><dt>Study hint</dt><dd>Whenever stuck, write Total = Average × Count.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">054</span><div><h3 class="term-name">Average of First N Natural Numbers</h3></div></div><p class="term-def">The average of a continuous natural-number series is the middle value.</p><dl class="term-rows"><dt>Formula</dt><dd>Average of 1 to n = (n + 1)/2.</dd><dt>Example</dt><dd>Average of 1 to 50 = 51/2 = 25.5.</dd><dt>Watch for</dt><dd>This works for natural numbers starting at 1.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">055</span><div><h3 class="term-name">Average of Even and Odd Series</h3></div></div><p class="term-def">For equally spaced even or odd series, average is still the middle value.</p><dl class="term-rows"><dt>Formula</dt><dd>First n even natural numbers average = n + 1. First n odd numbers average = n.</dd><dt>Example</dt><dd>First 10 even numbers average = 11. First 10 odd numbers average = 10.</dd><dt>Watch for</dt><dd>Check whether the wording says natural even numbers or any even numbers in a range.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">056</span><div><h3 class="term-name">Average of Squares and Cubes</h3></div></div><p class="term-def">These formulas help when the question gives squared or cubed observations.</p><dl class="term-rows"><dt>Formula</dt><dd>Average of squares of first n natural numbers = (n+1)(2n+1)/6. Average of cubes = n(n+1)^2/4.</dd><dt>Example</dt><dd>For n=5, average of squares = 6×11/6 = 11.</dd><dt>Practice</dt><dd>Do not memorise blindly; test with n=2 and n=3 to understand the formula.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">057</span><div><h3 class="term-name">Even Number of Observations</h3></div></div><p class="term-def">When values are in order and count is even, the average is the average of the two middle terms.</p><dl class="term-rows"><dt>Formula</dt><dd>Average = (first middle term + last middle term) / 2.</dd><dt>Example</dt><dd>Average of 2, 4, 6, 8 = (4+6)/2 = 5.</dd><dt>Watch for</dt><dd>This applies only when terms are equally placed around the middle or you are finding median-style average of a sequence.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">058</span><div><h3 class="term-name">Change in Average</h3></div></div><p class="term-def">When average changes after adding or removing a value, compare old total and new total.</p><dl class="term-rows"><dt>Formula</dt><dd>Change in value = New average × New count - Old average × Old count.</dd><dt>Example</dt><dd>Average of 5 numbers is 20. Add one number and new average is 22. New value = 22×6 - 20×5 = 32.</dd><dt>Study hint</dt><dd>Make a two-line table: old total, new total.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">059</span><div><h3 class="term-name">New Average</h3></div></div><p class="term-def">After a change, average is just the new total divided by the new count.</p><dl class="term-rows"><dt>Formula</dt><dd>New Average = New Total Sum / New Number of Observations.</dd><dt>Example</dt><dd>Current total = 100 for 5 people. Add 20. New average = 120/6 = 20.</dd><dt>Watch for</dt><dd>If one value is replaced, count stays the same.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">060</span><div><h3 class="term-name">Average Practice Method</h3></div></div><p class="term-def">Average problems become easy when you stop thinking in averages and start thinking in totals.</p><dl class="term-rows"><dt>Practice</dt><dd>Convert every average sentence to total sum before solving.</dd><dt>Example</dt><dd>"Average age of 8 people is 24" means total age = 8×24 = 192.</dd><dt>Study hint</dt><dd>Underline count changes: added, removed, replaced, joined, left.</dd></dl></div>
</div></div></section>

<section class="section learning-unit" id="unit-07"><div class="wrap"><div class="section-head"><div class="section-num">07</div><h2>Time & Work</h2><p class="lede">Treat work like a tank of units. Each person does some units per day, and combined work is found by adding rates.</p></div><div class="diagram"><div class="diagram-title">LCM Work Box</div><div class="diagram-sub">Total Work = LCM of individual times</div><div class="diagram-note">Person's one-day work = Total Work / Days taken alone.</div></div><div class="terms">
<div class="term"><div class="term-head"><span class="term-num">061</span><div><h3 class="term-name">Basic Work Formula</h3></div></div><p class="term-def">Work equals rate multiplied by time. Rate means work done in one unit of time.</p><dl class="term-rows"><dt>Formula</dt><dd>Work = Rate × Time. Rate = Work / Time.</dd><dt>Example</dt><dd>If 30 units are done in 5 days, rate = 6 units/day.</dd><dt>Study hint</dt><dd>Write rate beside every person before combining them.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">062</span><div><h3 class="term-name">LCM Method</h3></div></div><p class="term-def">LCM method avoids fractions by turning total work into a convenient unit number.</p><dl class="term-rows"><dt>Example</dt><dd>A finishes in 10 days, B in 20 days. Total work = LCM(10,20)=20. A rate=2, B rate=1, together rate=3. Time=20/3 days.</dd><dt>Watch for</dt><dd>LCM is total work, not answer time.</dd><dt>Practice</dt><dd>Use LCM method for all first-attempt work problems.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">063</span><div><h3 class="term-name">Three Person Concept</h3></div></div><p class="term-def">If A, B, and A+B+C are known, find C by subtracting A and B rates from total team rate.</p><dl class="term-rows"><dt>Example</dt><dd>A=15 days, B=20 days, A+B+C=8 days. Total work=120. A=8/day, B=6/day, team=15/day. C=1/day, so C takes 120 days.</dd><dt>Watch for</dt><dd>Subtract rates, not days.</dd><dt>Study hint</dt><dd>Days are inversely related to efficiency.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">064</span><div><h3 class="term-name">Leaving Midway</h3></div></div><p class="term-def">When someone leaves, split the problem into phases: together work first, then remaining work alone.</p><dl class="term-rows"><dt>Example</dt><dd>A=10 days, B=20 days. Total work=20. Rates: A=2, B=1. Work in 4 days together = 12. Remaining = 8. A alone time = 8/2 = 4 days.</dd><dt>Watch for</dt><dd>Do not use combined rate after someone leaves.</dd><dt>Practice</dt><dd>Draw a timeline with phase 1 and phase 2.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">065</span><div><h3 class="term-name">Men × Days = Work</h3></div></div><p class="term-def">For same type of workers doing same work, men and days are inversely related.</p><dl class="term-rows"><dt>Formula</dt><dd>M1D1 = M2D2.</dd><dt>Example</dt><dd>25 men take 12 days. 30 men take x days. 25×12=30x, so x=10 days.</dd><dt>Watch for</dt><dd>Only use directly when worker efficiency is same.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">066</span><div><h3 class="term-name">Men and Women Problems</h3></div></div><p class="term-def">Convert different worker types into unit efficiencies before solving.</p><dl class="term-rows"><dt>Example</dt><dd>If 1 man = 2 units and 1 woman = 1 unit, then 15 men + 20 women = 50 units/day. If they work 10 days, total work = 500 units.</dd><dt>Study hint</dt><dd>Convert people into work-rate units first.</dd><dt>Watch for</dt><dd>Do not add people directly if their efficiencies differ.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">067</span><div><h3 class="term-name">Man Day Hour Concept</h3></div></div><p class="term-def">When daily hours differ, total work depends on men, days, and hours.</p><dl class="term-rows"><dt>Formula</dt><dd>Work = M × D × H.</dd><dt>Example</dt><dd>A takes 6 days at 5 hours/day, total hours=30. B takes 15 days at 3 hours/day, total hours=45. Use LCM(30,45)=90 units.</dd><dt>Watch for</dt><dd>Convert to total hours before finding rate.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">068</span><div><h3 class="term-name">Efficiency Concept</h3></div></div><p class="term-def">Efficiency and time move opposite to each other. More efficient means less time.</p><dl class="term-rows"><dt>Example</dt><dd>If A is 60% more efficient than B, A:B efficiency = 160:100 = 8:5, so time ratio = 5:8.</dd><dt>Watch for</dt><dd>Invert efficiency ratio to get time ratio.</dd><dt>Study hint</dt><dd>Write Efficiency ↑, Time ↓.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">069</span><div><h3 class="term-name">Alternate Days</h3></div></div><p class="term-def">When people work on alternate days, group work into cycles.</p><dl class="term-rows"><dt>Example</dt><dd>A=20 days, B=30 days. Total work=60. A=3/day, B=2/day. Two-day cycle does 5 units. 60/5=12 cycles, so 24 days.</dd><dt>Watch for</dt><dd>If work is not exactly completed in cycles, solve the remaining days one by one.</dd><dt>Practice</dt><dd>Always name who starts first.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">070</span><div><h3 class="term-name">Time & Work Common Traps</h3></div></div><p class="term-def">The main traps are adding days instead of rates and forgetting that efficiency is inverse of time.</p><dl class="term-rows"><dt>Checklist</dt><dd>Total work, individual rates, combined rate, remaining work, final time.</dd><dt>Example</dt><dd>If A takes 10 days and B takes 20 days, together time is not 30 days. It is 20/3 days by LCM method.</dd><dt>Study hint</dt><dd>Never combine workers before converting to rates.</dd></dl></div>
</div></div></section>

<section class="section learning-unit" id="unit-08"><div class="wrap"><div class="section-head"><div class="section-num">08</div><h2>Pipes & Cisterns</h2><p class="lede">Pipes are time-work questions with signs. Filling pipes are positive; emptying pipes are negative.</p></div><div class="diagram"><div class="diagram-title">Tank Sign Diagram</div><div class="diagram-sub">Filling pipe = + rate · Emptying pipe = - rate</div><div class="diagram-note">Net rate decides whether the tank fills, empties, or never fills.</div></div><div class="terms">
<div class="term"><div class="term-head"><span class="term-num">071</span><div><h3 class="term-name">Basic Pipe Concept</h3></div></div><p class="term-def">Tank capacity is total work. A pipe's rate is tank capacity divided by time.</p><dl class="term-rows"><dt>Formula</dt><dd>Rate = Work / Time. Filling is positive; emptying is negative.</dd><dt>Example</dt><dd>Tank capacity 20 units, pipe fills in 10 hours, rate = +2 units/hour.</dd><dt>Watch for</dt><dd>Use negative sign for leaks and outlets.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">072</span><div><h3 class="term-name">Unit Method for Two Filling Pipes</h3></div></div><p class="term-def">Use LCM as tank capacity and add filling rates.</p><dl class="term-rows"><dt>Example</dt><dd>A fills in 10 hours, B in 20 hours. TC=20. A=2/hr, B=1/hr, total=3/hr. Time=20/3 hours.</dd><dt>Study hint</dt><dd>This is the same as Time & Work LCM method.</dd><dt>Watch for</dt><dd>Capacity is in tank units, not litres unless given.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">073</span><div><h3 class="term-name">Inlet and Outlet Together</h3></div></div><p class="term-def">When one pipe fills and one empties, subtract the outlet rate.</p><dl class="term-rows"><dt>Example</dt><dd>A fills in 10 hours, B empties in 40 hours. TC=40. A=+4/hr, B=-1/hr, net=3/hr. Time=40/3 hours.</dd><dt>Watch for</dt><dd>Forgetting the negative sign changes the answer completely.</dd><dt>Practice</dt><dd>Write + or - before every pipe rate.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">074</span><div><h3 class="term-name">Leak in the Tank</h3></div></div><p class="term-def">A leak is an emptying pipe. Compare the filling rate with the net filling rate.</p><dl class="term-rows"><dt>Example</dt><dd>A fills in 12 hours, but leak makes it fill in 15 hours. TC=60. Filling=5/hr, net=4/hr, leak=1/hr. Emptying time=60 hours.</dd><dt>Watch for</dt><dd>Leak rate = original filling rate - net rate.</dd><dt>Study hint</dt><dd>Write what happens without leak and with leak.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">075</span><div><h3 class="term-name">Alternate Opening of Pipes</h3></div></div><p class="term-def">For alternate pipes, solve in cycles just like alternate-day work.</p><dl class="term-rows"><dt>Example</dt><dd>A fills in 10 hours, B empties in 20 hours. TC=20. A=+2/hr, B=-1/hr. In 2 hours, net +1 unit. So 20 units takes 40 hours.</dd><dt>Watch for</dt><dd>Check whether the tank completes during a positive pipe's turn.</dd><dt>Practice</dt><dd>Group one full cycle, then handle leftover work.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">076</span><div><h3 class="term-name">Two Filling, One Emptying</h3></div></div><p class="term-def">Add all filling rates and subtract the emptying rate.</p><dl class="term-rows"><dt>Example</dt><dd>A fills in 10, B fills in 15, C empties in 30. TC=30. Rates: +3,+2,-1. Net=4/hr. Time=30/4=7.5 hours.</dd><dt>Watch for</dt><dd>Net rate can be zero or negative; then tank may never fill.</dd><dt>Study hint</dt><dd>Put rates in a single line: +3 +2 -1 = 4.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">077</span><div><h3 class="term-name">Partial Filling and Emptying</h3></div></div><p class="term-def">If tank starts half full, solve only the remaining half or the filled half depending on the question.</p><dl class="term-rows"><dt>Example</dt><dd>Tank filled in 8 hours and empties in 12 hours when full. If half tank must empty, TC=24, half=12, emptying rate=2/hr, time=6 hours.</dd><dt>Watch for</dt><dd>Do not solve for full tank when question asks half tank.</dd><dt>Practice</dt><dd>Mark starting level: empty, half, full.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">078</span><div><h3 class="term-name">Fractional Part Problems</h3></div></div><p class="term-def">If rates are already given as fractions of tank per hour, add/subtract them directly.</p><dl class="term-rows"><dt>Example</dt><dd>One pipe fills 1/3 tank per hour, another empties 1/6 tank per hour. Net = 1/3 - 1/6 = 1/6 tank/hour. Time=6 hours.</dd><dt>Watch for</dt><dd>Take LCM of fractions if mental addition is hard.</dd><dt>Study hint</dt><dd>Fraction rate means you already know work per hour.</dd></dl></div>
</div></div></section>

<section class="section learning-unit" id="unit-09"><div class="wrap"><div class="section-head"><div class="section-num">09</div><h2>Probability</h2><p class="lede">Probability is favourable outcomes divided by total outcomes. The skill is listing the sample space without missing cases.</p></div><div class="diagram"><div class="diagram-title">Probability Tree</div><div class="diagram-sub">Start → Branch every possible outcome → Count favourable leaves</div><div class="diagram-note">Use trees for coins, dice, cards, and conditional probability.</div></div><div class="terms">
<div class="term"><div class="term-head"><span class="term-num">079</span><div><h3 class="term-name">Basic Probability Formula</h3></div></div><p class="term-def">Probability measures the chance of an event.</p><dl class="term-rows"><dt>Formula</dt><dd>P(E) = Number of favourable outcomes / Total number of outcomes.</dd><dt>Example</dt><dd>Probability of getting a king from a deck = 4/52 = 1/13.</dd><dt>Watch for</dt><dd>Favourable outcomes must be part of the total sample space.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">080</span><div><h3 class="term-name">Sample Space</h3></div></div><p class="term-def">Sample space is the set of all possible outcomes.</p><dl class="term-rows"><dt>Example</dt><dd>Coin toss sample space = {H,T}. Die roll sample space = {1,2,3,4,5,6}.</dd><dt>Study hint</dt><dd>Write sample space before solving if the question is small.</dd><dt>Watch for</dt><dd>Do not count impossible outcomes.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">081</span><div><h3 class="term-name">Range of Probability</h3></div></div><p class="term-def">Probability is always between 0 and 1.</p><dl class="term-rows"><dt>Formula</dt><dd>0 ≤ P(E) ≤ 1. P(E)=0 means impossible; P(E)=1 means certain.</dd><dt>Example</dt><dd>Probability of rolling 7 on one die is 0. Probability of rolling 1 to 6 is 1.</dd><dt>Watch for</dt><dd>If your answer is more than 1, your counting is wrong.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">082</span><div><h3 class="term-name">Complementary Events</h3></div></div><p class="term-def">Complement means the event does not happen.</p><dl class="term-rows"><dt>Formula</dt><dd>P(E') = 1 - P(E).</dd><dt>Example</dt><dd>Probability of not getting a head in one toss = 1 - 1/2 = 1/2.</dd><dt>Study hint</dt><dd>Use complement for "at least one" questions.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">083</span><div><h3 class="term-name">Addition Theorem</h3></div></div><p class="term-def">Use addition theorem when the question asks for A or B.</p><dl class="term-rows"><dt>Formula</dt><dd>P(A ∪ B) = P(A) + P(B) - P(A ∩ B).</dd><dt>Example</dt><dd>For mutually exclusive events, intersection is zero, so add directly.</dd><dt>Watch for</dt><dd>Subtract overlap when events can happen together.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">084</span><div><h3 class="term-name">Independent Events</h3></div></div><p class="term-def">Independent events do not affect each other.</p><dl class="term-rows"><dt>Formula</dt><dd>P(A ∩ B) = P(A) × P(B).</dd><dt>Example</dt><dd>Tossing two coins: P(HH) = 1/2 × 1/2 = 1/4.</dd><dt>Watch for</dt><dd>Independent is not the same as mutually exclusive.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">085</span><div><h3 class="term-name">Conditional Probability</h3></div></div><p class="term-def">Conditional probability means probability of A when B has already happened.</p><dl class="term-rows"><dt>Formula</dt><dd>P(A|B) = P(A ∩ B) / P(B).</dd><dt>Example</dt><dd>If only even die outcomes are allowed {2,4,6}, probability of 6 given even = 1/3.</dd><dt>Study hint</dt><dd>Change the sample space after "given".</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">086</span><div><h3 class="term-name">Probability in Cards</h3></div></div><p class="term-def">A deck has 52 cards, 4 suits, 13 cards per suit, and 12 face cards.</p><dl class="term-rows"><dt>Formula</dt><dd>Hearts 13, Diamonds 13, Spades 13, Clubs 13. Kings=4, Queens=4, Aces=4.</dd><dt>Example</dt><dd>Probability of drawing a red card = 26/52 = 1/2.</dd><dt>Watch for</dt><dd>Face cards are J, Q, K only, usually 12 cards.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">087</span><div><h3 class="term-name">Probability in Dice and Coins</h3></div></div><p class="term-def">One die has 6 outcomes, two dice have 36 outcomes. One coin has 2 outcomes, n coins have 2^n outcomes.</p><dl class="term-rows"><dt>Example</dt><dd>Sum 7 with two dice has 6 favourable outcomes, so probability = 6/36 = 1/6.</dd><dt>Study hint</dt><dd>For dice sums, make a quick 6×6 grid or remember common counts.</dd><dt>Watch for</dt><dd>Two dice outcomes are ordered: (1,6) and (6,1) are different.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">088</span><div><h3 class="term-name">At Least and At Most</h3></div></div><p class="term-def">At least means minimum condition. At most means maximum condition. Complement is often faster.</p><dl class="term-rows"><dt>Formula</dt><dd>At least one = 1 - none.</dd><dt>Example</dt><dd>At least one head in 2 tosses = 1 - P(TT) = 1 - 1/4 = 3/4.</dd><dt>Watch for</dt><dd>Read "at least" and "exactly" carefully.</dd></dl></div>
</div></div></section>

<section class="section learning-unit" id="unit-10"><div class="wrap"><div class="section-head"><div class="section-num">10</div><h2>Tables & Quick Memory</h2><p class="lede">Some aptitude speed comes from memory: square numbers, common fraction percentages, and small benchmark values.</p></div><div class="terms">
<div class="term"><div class="term-head"><span class="term-num">089</span><div><h3 class="term-name">Square Numbers 1 to 100 <span class="term-alias">reference table</span></h3></div></div><p class="term-def">Squares are useful in simplification, roots, averages of squares, probability shortcuts, and approximation.</p><dl class="term-rows"><dt>Must know</dt><dd>1²=1, 10²=100, 15²=225, 20²=400, 25²=625, 30²=900, 40²=1600, 50²=2500, 75²=5625, 100²=10000.</dd><dt>Practice</dt><dd>Memorise 1 to 30 perfectly first, then learn 31 to 100 in blocks of 10.</dd><dt>Hint</dt><dd>(n+1)² = n² + 2n + 1 helps build the table quickly.</dd></dl></div>
<div class="term"><div class="term-head"><span class="term-num">090</span><div><h3 class="term-name">How to Study This Vault <span class="term-alias">practice plan</span></h3></div></div><p class="term-def">The fastest way to learn aptitude is pattern recognition plus timed repetition.</p><dl class="term-rows"><dt>Plan</dt><dd>Day 1: read formulas. Day 2: solve 5 sums per chapter. Day 3: revise mistakes. Day 4: mixed timed quiz.</dd><dt>Method</dt><dd>For every wrong answer, write the trigger: wrong formula, wrong base, unit error, sign error, or calculation slip.</dd><dt>Study hint</dt><dd>Ask Ant for "give me 5 practice sums on this chapter" after reading each unit.</dd></dl></div>
</div></div></section>

<section class="section learning-unit" id="cheat">
  <div class="wrap">
    <div class="section-head">
      <div class="section-num">FORMULA SHEET</div>
      <h2>Formula Sheet & Cheat Cards</h2>
      <p class="lede">A compact revision strip for formulas and shortcuts pulled from the filled aptitude chapters.</p>
    </div>
    <div class="cheat-grid">
      <div class="cheat">
        <h4>Number System Anchors</h4>
        <ul>
          <li><strong>Even / Odd</strong>Even = 2n; Odd = 2n + 1</li>
          <li><strong>Factors</strong>If n = p^a q^b, factors = (a+1)(b+1)</li>
          <li><strong>HCF × LCM</strong>For two numbers, product = HCF × LCM</li>
          <li><strong>Remainder</strong>n = dq + r</li>
        </ul>
      </div>
      <div class="cheat">
        <h4>Last Digit Cycles</h4>
        <ul>
          <li><strong>2</strong>2, 4, 8, 6</li>
          <li><strong>3</strong>3, 9, 7, 1</li>
          <li><strong>7</strong>7, 9, 3, 1</li>
          <li><strong>Rule</strong>Power mod 4 tells the position in cycle</li>
        </ul>
      </div>
      <div class="cheat">
        <h4>Simple Interest</h4>
        <ul>
          <li><strong>SI</strong>(P × R × T) / 100</li>
          <li><strong>Amount</strong>P + SI</li>
          <li><strong>Double</strong>Time = 100 / R</li>
          <li><strong>Shortcut</strong>One-year interest × years</li>
        </ul>
      </div>
      <div class="cheat">
        <h4>Compound Interest</h4>
        <ul>
          <li><strong>Amount</strong>P(1 + R/100)^T</li>
          <li><strong>CI</strong>Amount − Principal</li>
          <li><strong>Half-yearly</strong>Rate = R/2, Time = 2T</li>
          <li><strong>Quarterly</strong>Rate = R/4, Time = 4T</li>
        </ul>
      </div>
      <div class="cheat">
        <h4>SI vs CI Traps</h4>
        <ul>
          <li><strong>Growth</strong>SI is linear; CI is exponential</li>
          <li><strong>2 years</strong>CI − SI = P(R/100)^2</li>
          <li><strong>Multiple</strong>8 times = 3 doublings</li>
          <li><strong>Unit</strong>Always convert months to years</li>
        </ul>
      </div>
      <div class="cheat">
        <h4>Percentage Must Know</h4>
        <ul>
          <li><strong>1/8</strong>12.5%</li>
          <li><strong>3/8</strong>37.5%</li>
          <li><strong>1/11</strong>9.09%</li>
          <li><strong>Change</strong>(New - Old) / Old × 100</li>
        </ul>
      </div>
      <div class="cheat">
        <h4>Profit & Loss</h4>
        <ul>
          <li><strong>Profit</strong>SP - CP</li>
          <li><strong>Loss</strong>CP - SP</li>
          <li><strong>Discount</strong>MP - SP</li>
          <li><strong>Same SP</strong>Net loss = a² / 100</li>
        </ul>
      </div>
      <div class="cheat">
        <h4>Ratio Moves</h4>
        <ul>
          <li><strong>Sum</strong>Add parts</li>
          <li><strong>Difference</strong>Subtract parts</li>
          <li><strong>Chain</strong>Match common term by LCM</li>
          <li><strong>Variation</strong>Direct x/y, inverse xy</li>
        </ul>
      </div>
      <div class="cheat">
        <h4>Averages</h4>
        <ul>
          <li><strong>Average</strong>Total / Count</li>
          <li><strong>Total</strong>Average × Count</li>
          <li><strong>1 to n</strong>(n + 1) / 2</li>
          <li><strong>Change</strong>New total - Old total</li>
        </ul>
      </div>
      <div class="cheat">
        <h4>Time & Work</h4>
        <ul>
          <li><strong>Work</strong>Rate × Time</li>
          <li><strong>LCM</strong>Total work</li>
          <li><strong>Together</strong>Add rates</li>
          <li><strong>Efficiency</strong>Invert to get time ratio</li>
        </ul>
      </div>
      <div class="cheat">
        <h4>Pipes</h4>
        <ul>
          <li><strong>Fill</strong>Positive rate</li>
          <li><strong>Empty</strong>Negative rate</li>
          <li><strong>Net</strong>Add signed rates</li>
          <li><strong>Time</strong>Tank capacity / Net rate</li>
        </ul>
      </div>
      <div class="cheat">
        <h4>Probability</h4>
        <ul>
          <li><strong>Basic</strong>Favourable / Total</li>
          <li><strong>Complement</strong>1 - P(E)</li>
          <li><strong>Either</strong>P(A)+P(B)-P(A∩B)</li>
          <li><strong>At least one</strong>1 - none</li>
        </ul>
      </div>
    </div>
  </div>
</section>
`;

html = html.replace(/<header class="hero">[\s\S]*?<footer>/, `${aptitudeMain}\n\n<footer>`);
html = html.replace(/<footer>[\s\S]*?<\/footer>/, String.raw`<footer>
  <div class="wrap">
    <h3>The antBox Library.</h3>
    <p>Aptitude Vault is the quant wing of the library: pattern-first, formula-backed, and built for fast revision before mocks and placements.</p>
    <p>Number Systems, Interest, Percentage, Profit & Loss, Ratio, Averages, Time & Work, Pipes, Probability, and quick-memory references are now loaded from the shared source screenshots.</p>
    <div class="foot-meta">antbox · learning library · aptitude vault</div>
  </div>
</footer>`);
html = html
  .replace(/<title>[\s\S]*?<\/title>/, '<title>Antbox · Aptitude Vault</title>')
  .replace(/<a href="#" class="topbar-logo" aria-label="Antbox home">/g, '<a href="/" class="topbar-logo" aria-label="The antBox Library">')
  .replace(/document\.querySelector\('\.topbar-logo'\)\.addEventListener\('click', \(e\) => \{\s*e\.preventDefault\(\);\s*window\.scrollTo\(\{ top: 0, behavior: 'smooth' \}\);\s*\}\);/g, '// Logo links to the antBox Library home.')
  .replace(/Search the full preread\.\.\./g, 'Search formulas, patterns, examples...')
  .replace(/0<\/strong> \/ \d+ reviewed/g, '0</strong> / 90 reviewed')
  .replace(/Ask me about a finance term, scenario, journal entry, GST mismatch, close process, or anything in this preread\./g, 'Ask me about a formula, number pattern, shortcut, or practice sum from this aptitude vault.')
  .replace(/Explain this like I’m new to finance/g, "Explain this like I’m new to quant")
  .replace(/Give me the journal entry/g, 'Give me the formula')
  .replace(/What can go wrong here\?/g, 'Walk me through an example')
  .replace(/<button class="ant-chip" type="button">Show related terms<\/button>/g, '')
  .replace(/matches in the preread/g, 'matches in the aptitude vault')
  .replace(/const TOTAL_TERMS = \d+;/g, 'const TOTAL_TERMS = 90;')
  .replace(/\/api\/search/g, '/api/search-aptitude')
  .replace(/\/api\/ask/g, '/api/ask-aptitude')
  .replace(/#s0/g, '#unit-0')
  .replace(/id === 's0/g, "id === 'unit-0");

html = html.replace(/<nav[^>]*id="rail"[\s\S]*?<\/nav>/, String.raw`
<nav id="rail" class="rail" aria-label="Chapter navigation">
  <a href="#intro"><span class="rail-dot"></span><span class="rail-label">Intro</span></a>
  <a href="#unit-01"><span class="rail-dot"></span><span class="rail-label">01 · Number Systems</span></a>
  <a href="#unit-02"><span class="rail-dot"></span><span class="rail-label">02 · Interest</span></a>
  <a href="#unit-03"><span class="rail-dot"></span><span class="rail-label">03 · Percentage</span></a>
  <a href="#unit-04"><span class="rail-dot"></span><span class="rail-label">04 · Profit Loss</span></a>
  <a href="#unit-05"><span class="rail-dot"></span><span class="rail-label">05 · Ratio</span></a>
  <a href="#unit-06"><span class="rail-dot"></span><span class="rail-label">06 · Averages</span></a>
  <a href="#unit-07"><span class="rail-dot"></span><span class="rail-label">07 · Time Work</span></a>
  <a href="#unit-08"><span class="rail-dot"></span><span class="rail-label">08 · Pipes</span></a>
  <a href="#unit-09"><span class="rail-dot"></span><span class="rail-label">09 · Probability</span></a>
  <a href="#unit-10"><span class="rail-dot"></span><span class="rail-label">10 · Memory</span></a>
  <a href="#cheat"><span class="rail-dot"></span><span class="rail-label">Formula Sheet</span></a>
</nav>`);

html = html.replace('</body>', String.raw`
<style>
  .aptitude-note { position: relative; padding-right: 56px; }
  .aptitude-note .note-close {
    position: absolute;
    right: 16px;
    top: 14px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1px solid var(--line);
    background: var(--cream);
    color: var(--ink-muted);
    cursor: pointer;
    font-size: 18px;
    line-height: 1;
  }
  .aptitude-note .note-close:hover {
    color: var(--purple-deep);
    border-color: var(--purple-soft);
  }
</style>
<script>
  const note = document.getElementById('name-suggestion');
  const noteClose = note && note.querySelector('.note-close');
  if (note && !localStorage.getItem('antbox-aptitude-name-note-dismissed')) {
    noteClose?.addEventListener('click', () => {
      note.remove();
      localStorage.setItem('antbox-aptitude-name-note-dismissed', '1');
    });
    setTimeout(() => {
      if (document.body.contains(note)) note.remove();
    }, 8000);
  } else if (note) {
    note.remove();
  }
</script>
</body>`);

await writeFile(target, html);
console.log(`Wrote ${target.pathname}`);
