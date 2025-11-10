import { Challenge } from './types';

export const TOTAL_MONTHS = 48; // Dec 2020 to Nov 2024
export const START_MONTH_INDEX = 11; // 0-indexed, 11 is December
export const START_YEAR = 2020;

export const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export const COST_RATE_PER_DAY_SAVED = 2; // Reverted to original value
export const INTERMISSION_DURATION = 10; // Reverted to original value

export const CHALLENGES: Challenge[] = [
    {
        month: 2, // Feb 2021
        title: "ROW Delay & DFCC Obstruction (Severe)",
        description: "Key work fronts near Surat are blocked by delayed land handover and materials from the DFCC project. We have mobilized, but cannot work effectively.",
        options: [
            { label: "Joint Meetings & Phased Removal Plan", impact: "High management effort. Clears access progressively.", delay: -30, cost: 50 },
            { label: "Restructure Work & Prioritize Open Stretches", impact: "Flexible planning, but diverts high-cost equipment.", delay: 10, cost: 100 },
            { label: "Issue Formal Stop Work Notice to Client", impact: "Safeguards contract rights, but halts progress completely.", delay: 100, cost: -50 },
            { label: "Deploy Manpower to Start Preparatory Works Off-ROW", impact: "Low immediate progress, risks idle time for heavy machinery.", delay: 40, cost: -70 }
        ]
    },
    {
        month: 4, // Apr 2021
        title: "COVID-19 Second Wave Disruption (Critical)",
        description: "The pandemic has shut down large camps and reduced the workforce drastically. We must manage safety, cash flow, and resource retention.",
        options: [
            { label: "Camp Isolation Strategy & Health Protocols", impact: "High fixed cost investment, ensures gradual, safe workforce recovery.", delay: -80, cost: 200 },
            { label: "Full Demobilization & Release Leased Equipment", impact: "Saves immediate costs, but leads to major remobilization delays later.", delay: 250, cost: -100 },
            { label: "Retain Key Supervisory Staff Only (Skeleton Crew)", impact: "Minimizes cost and keeps planning alive, but delays all field work.", delay: 120, cost: 0 },
            { label: "Divert Focus to Remote Design & Procurement Activities", impact: "Maintains non-site momentum, but adds complexity to coordination.", delay: 60, cost: 80 }
        ]
    },
    {
        month: 7, // Jul 2021
        title: "Manpower Mobilization Crunch (Tough)",
        description: "The target is 20,000 laborers, but mobilization is slow, reaching less than a third due to safety fears and competition from local projects. Construction momentum is suffering.",
        options: [
            { label: "Implement Bonus and Welfare Schemes", impact: "High short-term cost, but rapidly accelerates ramp-up.", delay: -60, cost: 150 },
            { label: "Outsource Recruitment to Multiple Agencies", impact: "Fast mobilization, risks quality/skill issues, slight cost.", delay: -20, cost: 70 },
            { label: "Shift to Highly Mechanized Solutions (Fewer Workers)", impact: "High capital investment, resolves worker shortage, risks FSLM learning curve.", delay: 50, cost: 180 },
            { label: "Accept Slow Ramp-up, Prioritizing Quality & Training", impact: "Low risk, sacrifices current progress/schedule buffer.", delay: 130, cost: -30 }
        ]
    },
    {
        month: 10, // Oct 2021
        title: "Local Encumbrance: Utilities & Protests",
        description: "Work is halted due to local opposition and pending utility shifting (water/power lines). Stoppages are frequent, causing over 1,300 cumulative days of delay across the fronts.",
        options: [
            { label: "Dedicated Liaison & Real-time TFL Monitoring", impact: "Proactive negotiation, builds rapport, high administrative cost.", delay: -50, cost: 75 },
            { label: "Legal & Police Support for Forced Clearance", impact: "Fastest option, but risks community backlash and repeated stops.", delay: 10, cost: 0 },
            { label: "Design Work-Arounds (Minor Realignment)", impact: "Avoids conflict, requires Engineer's (TCAP) approval and redesign.", delay: 70, cost: 80 },
            { label: "Offer Compensation/CSR to Local Communities", impact: "High immediate expense, ensures smooth, long-term access.", delay: -20, cost: 120 }
        ]
    },
    {
        month: 13, // Jan 2022
        title: "Technical Delay: Vishwamitri Piles Design (Major Hold)",
        description: "Foundation works at the Vishwamitri River crossing are on hold for over a year pending the Engineer’s direction on revised pile designs due to geological surprises.",
        options: [
            { label: "Push for Temporary Approval & Parallel Rework", impact: "Maintains momentum under risk of future non-conformance/rework.", delay: -70, cost: 50 },
            { label: "Wait for Formal Direction (Safety First)", impact: "Ensures full compliance, leads to major idle time for equipment.", delay: 130, cost: -50 },
            { label: "Assign Dedicated L&T & TCAP Joint Task Force", impact: "Streamlines communication, but adds resource cost.", delay: -40, cost: 30 },
            { label: "Divert Resources to Other Substations/Works", impact: "Low technical risk, but disrupts optimized workflow and re-sequencing cost.", delay: 40, cost: 30 }
        ]
    },
    {
        month: 16, // Apr 2022
        title: "ITP-48 & Liquefiable Soil Approval",
        description: "The specialized ITP (Inspection and Test Plan) for treating the liquefiable soil near Vadodara has been stuck in TCAP approval for months, delaying a critical section.",
        options: [
            { label: "Start Works at Risk, Based on Draft ITP", impact: "High risk of rework/rejection, gains schedule time.", delay: -60, cost: 80 },
            { label: "Continuous Technical Dialogue & Daily Follow-up", impact: "Minimizes idle time by speeding approval, high management overhead.", delay: -30, cost: 40 },
            { label: "Wait for Final Approval (Zero Risk)", impact: "Full compliance, severe delay to the critical path.", delay: 90, cost: -10 },
            { label: "Propose an Alternative, Easier Soil Treatment Method", impact: "Requires new design approval, may not meet safety standards.", delay: 30, cost: 10 }
        ]
    },
    {
        month: 18, // Jun 2022
        title: "Design Release: Tapi/Narmada Bridges",
        description: "Drawings for major river crossings (Tapi and Narmada) are delayed, holding back the start of crucial substructure and cofferdam works.",
        options: [
            { label: "Early Procurement of Materials & Temporary Works", impact: "Allows immediate start post-release, high upfront capital cost.", delay: -40, cost: 150 },
            { label: "Demand Acceleration from TCAP with Penalty Threat", impact: "Creates friction, may or may not speed up TCAP. Low cost.", delay: 50, cost: -10 },
            { label: "Shift Focus Entirely to Viaduct Segments", impact: "Maximizes progress elsewhere, risks bridge being the ultimate critical path.", delay: 10, cost: 20 },
            { label: "Reduce Scope of Temporary Works to Save Cost", impact: "Saves cost, risks delays if drawings require more complex temporary works.", delay: 70, cost: -50 }
        ]
    },
    {
        month: 20, // Aug 2022
        title: "Adverse Weather and Flooding",
        description: "Unusually heavy rainfall caused flooding in Gujarat, affecting concreting schedules and safety. Works are temporarily suspended.",
        options: [
            { label: "Retain Key Resources During Idle Period", impact: "High retention cost, ensures immediate remobilization.", delay: 30, cost: 100 },
            { label: "Temporarily Release Non-Critical Resources", impact: "Saves short-term cost, risks remobilization delay and higher long-term costs.", delay: 60, cost: -50 },
            { label: "Accelerate Pre-Monsoon Works in Future Years", impact: "Mitigation for *next* year, zero immediate impact.", delay: 0, cost: 10 },
            { label: "Invest in Flood Protection Measures (Bunds, Pumps)", impact: "High capital cost, prevents future weather delays.", delay: -10, cost: 150 }
        ]
    },
    {
        month: 22, // Oct 2022
        title: "Casting Yard Land Acquisition",
        description: "We are struggling to acquire the full 1,000 acres required for casting yards along the alignment, threatening the full scale of FSLM operations.",
        options: [
            { label: "Propose Phased/Smaller Yard Operations", impact: "Lower initial capacity, reduces immediate land pressure, slightly slower progress.", delay: 40, cost: -30 },
            { label: "Pay Premium to Fast-Track Remaining Land", impact: "High immediate cost, ensures full capacity/faster production.", delay: -50, cost: 100 },
            { label: "Reduce Total Casting Yard Requirement by Centralizing", impact: "Saves land cost, increases logistics/transportation costs and risks.", delay: 20, cost: 80 },
            { label: "Halt Casting Yard Development Until Land is 100% Clear", impact: "Full compliance, but stops the critical segment production process.", delay: 180, cost: -80 }
        ]
    },
    {
        month: 24, // Dec 2022
        title: "FSLM First-Time Implementation (Crippling Low Efficiency)",
        description: "The Full Span Launching Method (Shinkansen technology) is a steep learning curve. The pace is slow, and initial coordination is imperfect.",
        options: [
            { label: "Intensive Training & Japanese Expert Input", impact: "High upfront cost, quick improvement in productivity.", delay: -80, cost: 150 },
            { label: " 'Learn on the Job' Approach' Focus on Volume", impact: "Saves training cost, but suffers sustained low productivity/non-conformance.", delay: 200, cost: -50 },
            { label: "Shift Back to Short-Block Segment (SBS) Method", impact: "Eliminates FSLM risk, but slows down long-term speed/progress.", delay: 100, cost: -80 },
            { label: "Hire Experienced Operators from Global Projects", impact: "High cost for specialized labor, rapid but temporary fix.", delay: -40, cost: 90 }
        ]
    },
    {
        month: 26, // Feb 2023
        title: "Concrete Logistics & Supply Chain",
        description: "Hitting the target of 3 lakh cubic meters of concrete per month is proving difficult. Batching plant capacity and transport logistics are strained.",
        options: [
            { label: "Invest in New Batching Plants & Trucks", impact: "High capital cost, guarantees supply reliability.", delay: -60, cost: 200 },
            { label: "Use Third-Party Ready-Mix (RMC) Suppliers", impact: "Fast capacity increase, risks external quality control.", delay: 0, cost: 50 },
            { label: "Negotiate Bulk Discounts for Materials", impact: "Saves cost, but does not solve logistics bottleneck.", delay: 30, cost: -70 },
            { label: "Slow Down Pouring to Ensure Quality Control", impact: "High quality, sacrifices monthly production target.", delay: 90, cost: -30 }
        ]
    },
    {
        month: 28, // Apr 2023
        title: "Quality Assurance vs. Speed",
        description: "The TCAP Engineer is enforcing rigorous quality checks, leading to slow Inspection and Test Plan (ITP) sign-offs and holding up casting/launching.",
        options: [
            { label: "Institute 24/7 Dedicated QC/QA Team", impact: "High cost, streamlines ITP process and reduces waiting time.", delay: -50, cost: 80 },
            { label: "Lobby NHSRCL to Relax Inspection Frequency", impact: "Risks quality, potentially speeds up workflow if approved.", delay: 30, cost: -10 },
            { label: "Implement Pre-emptive Digital Quality Tracking", impact: "High tech investment, reduces inspection time in the long run.", delay: -20, cost: 120 },
            { label: "Only work on non-critical path elements until TCAP relaxes", impact: "Guarantees quality but pushes critical path progress back.", delay: 120, cost: -50 }
        ]
    },
    {
        month: 30, // Jun 2023
        title: "Night-time Launching Restriction (Severe Impact)",
        description: "Local authorities impose restrictions on night-time heavy transport and launching operations due to noise complaints and traffic concerns. This effectively cuts capacity by half.",
        options: [
            { label: "Dedicated Liaison with Local Administration", impact: "Builds rapport, gradual clearance with high negotiation cost.", delay: -50, cost: 50 },
            { label: "Use Only Low-Noise Equipment & Methods", impact: "High rental/purchase cost, removes constraint.", delay: -30, cost: 100 },
            { label: "Shift Launching to Daytime Only", impact: "Massive speed loss, zero risk of public complaint.", delay: 240, cost: -80 },
            { label: "Seek High-Level Intervention from NHSRCL/State", impact: "Political solution, slow and uncertain outcome.", delay: 100, cost: -10 }
        ]
    },
    {
        month: 32, // Aug 2023
        title: "Interfacing Conflict (P1B Contractor)",
        description: "Frequent 'hold works' instructions at the GAD-62 interface due to interference with the parallel P1B contractor, demanding careful management.",
        options: [
            { label: "Joint Interface Meetings & Staggered Work Scheduling", impact: "High management time, reduces mutual interference significantly.", delay: -60, cost: 40 },
            { label: "Escalate Conflict to NHSRCL for Formal Order", impact: "Minimizes personal conflict, but may result in your package holding works.", delay: 100, cost: -30 },
            { label: "Offer Financial Compensation for Delay/Rework", impact: "Fastest way to move, high immediate cost.", delay: -30, cost: 120 },
            { label: "Temporarily Halt Work at Interface Zone", impact: "Low risk, ensures compliance, large delay impact.", delay: 150, cost: -50 }
        ]
    },
    {
        month: 34, // Oct 2023
        title: "Equipment Breakdown (Casting Gantry) - Extreme",
        description: "A critical casting yard gantry crane breaks down during a peak production month. This idles a massive team and threatens the supply of segments.",
        options: [
            { label: "Immediate Emergency Replacement/Rental", impact: "Massive rental cost, fastest recovery time.", delay: -50, cost: 250 },
            { label: "On-site Repair with Local Resources", impact: "Low cost, long downtime.", delay: 120, cost: -70 },
            { label: "Divert Segments from Another Package (If Possible)", impact: "High coordination effort, risks delay on the other package.", delay: 20, cost: 80 },
            { label: "Shift Workforce to Off-Peak Activities (Maintenance)", impact: "Uses time productively, but doesn't fix the critical path issue.", delay: 90, cost: -10 }
        ]
    },
    {
        month: 36, // Dec 2023
        title: "Late Lifting Location Confirmation",
        description: "The Engineer's late confirmation on final FSLM lifting locations creates uncertainty in the equipment procurement plan, causing minor stoppages.",
        options: [
            { label: "Push for Temporary Approval to Order Equipment", impact: "Maintains schedule, high cost/risk if locations change.", delay: -40, cost: 70 },
            { label: "Wait for Final Formal Confirmation (Zero Risk)", impact: "Ensures compliance, causes equipment idle time.", delay: 80, cost: -40 },
            { label: "Order General Purpose Lifting Equipment", impact: "Flexibility, but potentially less efficient/safe.", delay: 10, cost: 0 },
            { label: "Offer TCAP a Financial Incentive for Fast-Track Review", impact: "Unethical but fastest solution, very high cost.", delay: -60, cost: 300 }
        ]
    },
    {
        month: 38, // Feb 2024
        title: "Final ROW Clearance Near Station",
        description: "A small, critical land parcel needed for final station approach work is delayed due to complex legal proceedings.",
        options: [
            { label: "Start Work Around the Obstruction", impact: "Maintains progress, risks interference and costly rework later.", delay: 20, cost: 30 },
            { label: "High-Priority Legal Team Engagement", impact: "High immediate legal cost, fastest resolution of land issue.", delay: -40, cost: 100 },
            { label: "Negotiate with Landowner Directly", impact: "Fast, but risks overpaying for land, moderate cost.", delay: -10, cost: 50 },
            { label: "Pause All Station Approach Work Until Clearance", impact: "Zero risk, but delays a critical and visible project component.", delay: 120, cost: -30 }
        ]
    },
    {
        month: 40, // Apr 2024
        title: "Workforce Fatigue & Safety Risk",
        description: "The sustained high-pressure environment is leading to workforce burnout, increased minor incidents, and poor quality control.",
        options: [
            { label: "Implement Mandatory Safety Stand-Down & Rest Days", impact: "Reduces incidents/improves morale, but causes immediate schedule loss.", delay: 60, cost: -50 },
            { label: "Increase Safety Supervision & Penalties", impact: "Low cost, risks low morale and resentment.", delay: 20, cost: 0 },
            { label: "Offer Overtime Bonuses & Incentive Pay", impact: "High cost, increases speed but potentially also fatigue.", delay: -30, cost: 100 },
            { label: "Rotate Teams to Reduce Individual Workload", impact: "Complex logistics, moderate success in reducing fatigue.", delay: 30, cost: 50 }
        ]
    },
    {
        month: 42, // Jun 2024
        title: "The Final Acceleration Push (D-Day)",
        description: "Cumulative delays are massive. You must now decide on the most drastic acceleration strategy to attempt to save the schedule.",
        options: [
            { label: "Launch Aggressive Acceleration Plan (Surge & Night Work)", impact: "Massive immediate cost, but offers significant recovery potential.", delay: -120, cost: 400 },
            { label: "File for Time Extension & Maintain Standard Pace", impact: "Low cost, but ensures project fails target date by a wide margin.", delay: 400, cost: -150 },
            { label: "Limit Acceleration to High-Impact Tasks Only", impact: "Targeted cost, moderate delay reduction.", delay: -80, cost: 150 },
            { label: "Deploy Alternative, Faster, Lower-Quality Methods", impact: "Extremely high risk of rework, fastest schedule recovery.", delay: -200, cost: 100 }
        ]
    },
    {
        month: 44, // Aug 2024
        title: "Pre-Completion Testing & Handover Deadline",
        description: "Final dynamic testing and clearance procedures are looming. TCAP and NHSRCL require extensive documentation and test runs.",
        options: [
            { label: "Dedicated Handover Task Force & Documentation Surge", impact: "High administrative cost, ensures smooth final clearance.", delay: -30, cost: 80 },
            { label: "Fast-Track Testing (Minimize Protocol)", impact: "Saves time, high risk of rejection and re-testing.", delay: 30, cost: -50 },
            { label: "Delay Final Billing to Focus on Site Completion", impact: "Internal cost issue, keeps focus on speed.", delay: 20, cost: -80 },
            { label: "Offer TCAP/NHSRCL Staff High-Value Incentives", impact: "High, questionable cost, speeds up final sign-off.", delay: -50, cost: 200 }
        ]
    }
];


export const PM_TIPS: string[] = [
  "<strong>Early Stakeholder Engagement</strong> is key to mitigating risks related to land acquisition and regulatory approvals.",
  "A robust <strong>Risk Register</strong> should be a living document, updated regularly with mitigation strategies for new threats.",
  "The <strong>Critical Path Method (CPM)</strong> helps identify which tasks have zero float and must be monitored closely to prevent schedule slippage.",
  "Never underestimate the power of a clear <strong>Communication Plan</strong>. Keeping all stakeholders informed prevents misunderstandings and aligns expectations.",
  "<strong>Earned Value Management (EVM)</strong> provides an integrated view of scope, schedule, and cost performance.",
  "In large projects, investing in <strong>redundant supply chains</strong> for critical materials can be cheaper than a single-source disruption.",
];