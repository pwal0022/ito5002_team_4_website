<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="landing-page">
    <div class="hero-section text-center mb-5">
      <!-- HERO BANNER -->
      <div id="hero-container">
        <img class="hero" src="\src\assets\rebateBanner.jpg" />
        <div id="center-text">
          <p id="text">Rebates and Grants</p>
          <p id="text2">Find out if your eligble for a grant!</p>
        </div>
      </div>
      <!-- <div class="container-fluid p-0 mb-5">
        <div class="position-relative"> -->
      <!-- Background -->
      <!-- <img
            src="\src\assets\rebateBanner.jpg"
            class="img-fluid w-100 rounded-3 shadow-sm"
            style="height: 360px; object-fit: cover; filter: brightness(0.55)"
            alt="Australian nature banner"
          /> -->
      <!-- banner -->

      <!-- <div
            class="position-absolute top-50 start-50 translate-middle text-center text-white px-3 px-md-5"
          >
            <h1 class="banner-title mb-3">Rebates and Grants</h1>

            <p class="banner-subtitle mb-4">Find out if your eligble for a grant!</p>
            <h1 class="fw-bold display-5 mb-3"></h1>
          </div>
        </div> -->
      <!-- </div> -->
      <br />
      <p style="color: black">Click on each state below to see what grants are available to you.</p>
      <!-- Accordion -->
      <div class="w-100" style="max-width: 100vw; margin: 0; padding: 0">
        <div class="accordion w-100" id="accordionExample">
          <!-- Federal Grants  -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseZero"
                aria-expanded="true"
                aria-controls="collapseZero"
              >
                Federal Grants
              </button>
            </h2>
            <div
              id="collapseZero"
              class="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <a
                  href="https://www.energy.gov.au/rebates/cheaper-home-batteries-program"
                  target="_blank"
                  >Cheaper Home Batteries Program
                </a>
                <p>
                  Starting 1 July 2025, the Australian Government is offering around a 30% discount
                  on eligible home battery systems (5-100 kWh usable capacity), applied via approved
                  solar/battery retailers or installers.
                </p>
                <a
                  href="https://www.energy.gov.au/rebates/household-energy-upgrades-fund"
                  target="_blank"
                  >Household Energy Upgrades Fund
                </a>
                <p>
                  A $1 billion Australian Government program run through the Clean Energy Finance
                  Corporation (CEFC) that provides discounted loans (via participating banks) to
                  households for energy-efficiency upgrades — including solar PV, home batteries,
                  modern appliances, insulation, and more.
                </p>
                <a
                  href="https://www.ato.gov.au/businesses-and-organisations/hiring-and-paying-your-workers/fringe-benefits-tax/types-of-fringe-benefits/fbt-on-cars-other-vehicles-parking-and-tolls/fbt-on-plug-in-hybrid-electric-vehicles?utm_source=chatgpt.com"
                  target="_blank"
                  >EV (zero/low emissions) FBT exemption
                </a>
                <p>
                  EV (zero/low emissions) FBT exemption and related federal supports still
                  meaningfully reduce the cost of EV salary-packaging / novated leasing (and
                  business incentives exist such as instant asset write-offs where applicable).
                  Check ATO/official guidance for exact thresholds and eligibility
                </p>
              </div>
            </div>
          </div>
          <!-- NSW -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
              >
                New South Wales
              </button>
            </h2>
            <div
              id="collapseOne"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <a
                  href="https://www.energy.nsw.gov.au/households/rebates-grants-and-schemes/household-energy-saving-upgrades/connect-your-battery-virtual"
                  target="_blank"
                  >Virtual Power Plant (VPP) incentive</a
                >
                <p>
                  Virtual Power Plant (VPP) incentive / Peak Demand Reduction Scheme (PDRS) — NSW
                  pays an upfront incentive for signing a household battery into a VPP (recently
                  increased; can be combined with the federal CHBP). Eligibility requires a solar +
                  battery at the address and an accredited supplier. Typical VPP incentive value
                  examples cited around up to $1,500 (depends on capacity/provider). The old
                  standalone NSW battery installation discount ended because of the federal program,
                  but the VPP signup incentive remains.The Australian Government's
                </p>
                <a href="https://cer.gov.au/batteries" target="_blank"
                  >Cheaper Home Batteries Program</a
                >
                <p>discount is now available.</p>
                <p>
                  Federal grants also available:
                  <a
                    href="https://www.energy.gov.au/rebates/cheaper-home-batteries-program"
                    target="_blank"
                    >Cheaper Home Batteries Program
                  </a>

                  <a
                    href="https://www.energy.gov.au/rebates/household-energy-upgrades-fund"
                    target="_blank"
                    >Household Energy Upgrades Fund
                  </a>

                  <a
                    href="https://www.ato.gov.au/businesses-and-organisations/hiring-and-paying-your-workers/fringe-benefits-tax/types-of-fringe-benefits/fbt-on-cars-other-vehicles-parking-and-tolls/fbt-on-plug-in-hybrid-electric-vehicles?utm_source=chatgpt.com"
                    target="_blank"
                    >EV (zero/low emissions) FBT exemption
                  </a>
                </p>
              </div>
            </div>
          </div>
          <!-- Victoria -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Victoria
              </button>
            </h2>
            <div
              id="collapseTwo"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <a
                  href="https://www.solar.vic.gov.au/sites/default/files/2023-06/FactSheet_Battery_05.01.23.pdf"
                  target="_blank"
                >
                  Solar Homes Program (Battery Rebate)</a
                >
                <p>
                  Eligible Victorian households can claim up to $2,950 off the cost of a solar
                  battery. Your solar retailer will handle the rebate, subtracting it from your
                  total installation cost.
                </p>
                <p>
                  Federal grants also available:
                  <a
                    href="https://www.energy.gov.au/rebates/cheaper-home-batteries-program"
                    target="_blank"
                    >Cheaper Home Batteries Program
                  </a>

                  <a
                    href="https://www.energy.gov.au/rebates/household-energy-upgrades-fund"
                    target="_blank"
                    >Household Energy Upgrades Fund
                  </a>

                  <a
                    href="https://www.ato.gov.au/businesses-and-organisations/hiring-and-paying-your-workers/fringe-benefits-tax/types-of-fringe-benefits/fbt-on-cars-other-vehicles-parking-and-tolls/fbt-on-plug-in-hybrid-electric-vehicles?utm_source=chatgpt.com"
                    target="_blank"
                    >EV (zero/low emissions) FBT exemption
                  </a>
                </p>
              </div>
            </div>
          </div>
          <!-- Queensland -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                Queensland
              </button>
            </h2>
            <div
              id="collapseThree"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <a
                  href="https://www.qld.gov.au/transport/projects/electricvehicles"
                  target="_blank"
                >
                  Queensland Electric Vehicle Incentives</a
                >
                <p>
                  Queensland previously offered a $3,000–$6,000 rebate for new EVs under certain
                  price thresholds, but this program has now closed due to exhausted funding.
                  However, EV buyers still receive reduced stamp duty (as low as $2 per $100 of
                  vehicle value) and lower annual registration fees compared with petrol vehicles.
                  The state continues to support EV uptake through infrastructure expansion rather
                  than direct purchase rebates.
                </p>
                <p>
                  Federal grants also available:
                  <a
                    href="https://www.energy.gov.au/rebates/cheaper-home-batteries-program"
                    target="_blank"
                    >Cheaper Home Batteries Program
                  </a>

                  <a
                    href="https://www.energy.gov.au/rebates/household-energy-upgrades-fund"
                    target="_blank"
                    >Household Energy Upgrades Fund
                  </a>

                  <a
                    href="https://www.ato.gov.au/businesses-and-organisations/hiring-and-paying-your-workers/fringe-benefits-tax/types-of-fringe-benefits/fbt-on-cars-other-vehicles-parking-and-tolls/fbt-on-plug-in-hybrid-electric-vehicles?utm_source=chatgpt.com"
                    target="_blank"
                    >EV (zero/low emissions) FBT exemption
                  </a>
                </p>
              </div>
            </div>
          </div>
          <!-- South Australia -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
                aria-expanded="false"
                aria-controls="collapseFour"
              >
                South Australia
              </button>
            </h2>
            <div
              id="collapseFour"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <a
                  href="https://www.treasury.sa.gov.au/Growing-South-Australia/incentives-for-electric-vehicles"
                  target="_blank"
                >
                  South Australia Zero Emission Vehicle Incentives</a
                >
                <p>
                  South Australia’s $3,000 EV purchase subsidy has ended, but eligible electric
                  vehicles registered before 30 June 2025 may still receive three years of free
                  registration. Other incentives have expired, though the state continues to invest
                  in public charging networks and ZEV infrastructure.
                </p>
                <p>
                  Federal grants also available:
                  <a
                    href="https://www.energy.gov.au/rebates/cheaper-home-batteries-program"
                    target="_blank"
                    >Cheaper Home Batteries Program
                  </a>

                  <a
                    href="https://www.energy.gov.au/rebates/household-energy-upgrades-fund"
                    target="_blank"
                    >Household Energy Upgrades Fund
                  </a>

                  <a
                    href="https://www.ato.gov.au/businesses-and-organisations/hiring-and-paying-your-workers/fringe-benefits-tax/types-of-fringe-benefits/fbt-on-cars-other-vehicles-parking-and-tolls/fbt-on-plug-in-hybrid-electric-vehicles?utm_source=chatgpt.com"
                    target="_blank"
                    >EV (zero/low emissions) FBT exemption
                  </a>
                </p>
              </div>
            </div>
          </div>
          <!-- Western Australia -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFive"
                aria-expanded="false"
                aria-controls="collapseFive"
              >
                Western Australia
              </button>
            </h2>
            <div
              id="collapseFive"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <a
                  href="https://www.wa.gov.au/organisation/energy-policy-wa/wa-residential-battery-scheme"
                  target="_blank"
                  >Western Australia – WA Residential Battery Scheme</a
                >
                <p>
                  The WA Government provides one-off rebates for home batteries: up to $1,300 for
                  Synergy customers (or $130/kWh) and $3,800 for Horizon Power customers. When
                  combined with the federal program, total support can reach up to $5,000–$7,500.
                </p>
                <p>
                  Federal grants also available:
                  <a
                    href="https://www.energy.gov.au/rebates/cheaper-home-batteries-program"
                    target="_blank"
                    >Cheaper Home Batteries Program
                  </a>

                  <a
                    href="https://www.energy.gov.au/rebates/household-energy-upgrades-fund"
                    target="_blank"
                    >Household Energy Upgrades Fund
                  </a>

                  <a
                    href="https://www.ato.gov.au/businesses-and-organisations/hiring-and-paying-your-workers/fringe-benefits-tax/types-of-fringe-benefits/fbt-on-cars-other-vehicles-parking-and-tolls/fbt-on-plug-in-hybrid-electric-vehicles?utm_source=chatgpt.com"
                    target="_blank"
                    >EV (zero/low emissions) FBT exemption
                  </a>
                </p>
              </div>
            </div>
          </div>
          <!-- Tasmania -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseSix"
                aria-expanded="false"
                aria-controls="collapseSix"
              >
                Tasmania
              </button>
            </h2>
            <div
              id="collapseSix"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <a
                  href="https://www.recfit.tas.gov.au/grants_programs/energy-efficiency/energy_saver_loan_scheme"
                  target="_blank"
                >
                  Energy Saver Loan Scheme - Now Closed</a
                >
                <p>
                  Tasmanian households (and small businesses) can access interest-free loans (up to
                  $10,000) for energy-saving upgrades, including eligible battery systems.
                </p>
                <p>
                  Federal grants also available:
                  <a
                    href="https://www.energy.gov.au/rebates/cheaper-home-batteries-program"
                    target="_blank"
                    >Cheaper Home Batteries Program
                  </a>

                  <a
                    href="https://www.energy.gov.au/rebates/household-energy-upgrades-fund"
                    target="_blank"
                    >Household Energy Upgrades Fund
                  </a>

                  <a
                    href="https://www.ato.gov.au/businesses-and-organisations/hiring-and-paying-your-workers/fringe-benefits-tax/types-of-fringe-benefits/fbt-on-cars-other-vehicles-parking-and-tolls/fbt-on-plug-in-hybrid-electric-vehicles?utm_source=chatgpt.com"
                    target="_blank"
                    >EV (zero/low emissions) FBT exemption
                  </a>
                </p>
              </div>
            </div>
          </div>
          <!-- Northern Territory -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseSeven"
                aria-expanded="false"
                aria-controls="collapseSeven"
              >
                Northern Territory
              </button>
            </h2>
            <div
              id="collapseSeven"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <a
                  href="https://nt.gov.au/driving/rego/getting-an-nt-registration/get-electric-vehicle-registration-and-stamp-duty-concessions"
                  target="_blank"
                >
                  Northern Territory Electric Vehicle Incentives</a
                >
                <p>
                  Until 30 June 2027, eligible BEVs and PHEVs in the NT receive free registration
                  and up to $1,500 stamp duty concession for vehicles valued up to $50,000.
                  Concessions apply automatically for new, existing, transferred, or imported EVs,
                  and remain with the vehicle if sold. MAC charges still apply.
                </p>
                <a
                  href="https://nt.gov.au/driving/rego/getting-an-nt-registration/get-electric-vehicle-registration-and-stamp-duty-concessions?utm_source=chatgpt.com"
                  target="_blank"
                >
                  Registration & stamp-duty concessions for EVs (to 30 June 2027)</a
                >
                <p>
                  NT offers registration and stamp duty concessions (including free registration for
                  some eligible plug-in EVs and stamp-duty concessions up to a cap).
                </p>
                <a
                  href="https://nt.gov.au/industry/business-grants-funding/electric-vehicle-charger-residential-and-business-grants-scheme?utm_source=chatgpt.com"
                  target="_blank"
                >
                  EV charger grants</a
                >
                <p>
                  NT offers grants for residential EV charger installs (e.g. up to $1,000
                  residential, $2,500 business) under an EV Charger Grants Scheme.
                </p>
                <p>
                  Federal grants also available:
                  <a
                    href="https://www.energy.gov.au/rebates/cheaper-home-batteries-program"
                    target="_blank"
                    >Cheaper Home Batteries Program
                  </a>

                  <a
                    href="https://www.energy.gov.au/rebates/household-energy-upgrades-fund"
                    target="_blank"
                    >Household Energy Upgrades Fund
                  </a>

                  <a
                    href="https://www.ato.gov.au/businesses-and-organisations/hiring-and-paying-your-workers/fringe-benefits-tax/types-of-fringe-benefits/fbt-on-cars-other-vehicles-parking-and-tolls/fbt-on-plug-in-hybrid-electric-vehicles?utm_source=chatgpt.com"
                    target="_blank"
                    >EV (zero/low emissions) FBT exemption
                  </a>
                </p>
              </div>
            </div>
          </div>
          <!-- ACT -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseEight"
                aria-expanded="false"
                aria-controls="collapseEight"
              >
                Australian Capitol Territory
              </button>
            </h2>
            <div
              id="collapseEight"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <a
                  href="https://www.climatechoices.act.gov.au/policy-programs/sustainable-household-scheme"
                  target="_blank"
                >
                  Sustainable Household Scheme – Low-Interest Loan</a
                >
                <p>
                  ACT homeowners can access a loan of up to $15,000 (previously 0 %, now interest
                  applies) for energy-efficient upgrades, including battery storage.
                </p>
                <a
                  href="https://www.accesscanberra.act.gov.au/driving-transport-and-parking/registration/incentives-for-low-and-zero-emissions-vehicles"
                  target="_blank"
                >
                  Zero-Emissions Vehicle Incentives</a
                >
                <p>
                  The ACT offers discounted registration for zero-emission and low-emission vehicles
                  under its new emissions-based system, meaning ZEVs, PHEVs, HEVs and other
                  low-emission vehicles pay lower rego fees. Through the Sustainable Household
                  Scheme, eligible homeowners can also access low-interest loans up to $15,000 to
                  purchase new or used ZEVs or install home charging equipment.
                </p>
                <p>
                  Federal grants also available:
                  <a
                    href="https://www.energy.gov.au/rebates/cheaper-home-batteries-program"
                    target="_blank"
                    >Cheaper Home Batteries Program
                  </a>

                  <a
                    href="https://www.energy.gov.au/rebates/household-energy-upgrades-fund"
                    target="_blank"
                    >Household Energy Upgrades Fund
                  </a>

                  <a
                    href="https://www.ato.gov.au/businesses-and-organisations/hiring-and-paying-your-workers/fringe-benefits-tax/types-of-fringe-benefits/fbt-on-cars-other-vehicles-parking-and-tolls/fbt-on-plug-in-hybrid-electric-vehicles?utm_source=chatgpt.com"
                    target="_blank"
                    >EV (zero/low emissions) FBT exemption
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RebatesAndSchemes',
}
</script>

<style scoped>
.accordion,
.accordion-item,
.accordion-button {
  width: 100% !important;
  display: block !important;
}
.accordion-button {
  background-color: #099ec8;
  font-weight: bold;
}
.accordion-item {
  border-left: none;
  border-right: none;
}

.accordion-body {
  width: 100% !important;
}
</style>
