# **OA ADVANCE**

OA Advance is a public-private solution designed to accelerate government payments to contractors and suppliers. It enables near-instant payment to suppliers, eliminates liquidity bottlenecks, and improves payment accountability across ministries.

# **PLATFORM**

The platform is the OA Advance Platform with OA Advance logo and color scheme. It has the mobile application, and website option. The core functionalities are developed around our clients - contractors and key stakeholders - government agencies. It focuses on streamlining invoice discounting and disbursement processes between agencies and their contractors. The system will enable seamless invoice uploads by suppliers, swift verification and approval by government agencies, and provide dedicated reporting portals for agencies, the Ministry of Finance, and other oversight institutions. The program will begin with priority agencies such as GETFund, NHIS, and the Road Fund, with the goal of scaling across other statutory bodies and public infrastructure entities nationwide.

# **PRODUCT VISION**

OA Advance aims to become the leading, trusted liquidity partner for government-approved contractors and suppliers across Africa — accelerating payments, reducing fiscal bottlenecks, and enabling efficient public infrastructure delivery without relying on complex financial engineering.

# **CORE FUNCTIONALITY**

The system will allow verified government agencies to seamlessly submit contractor and supplier details through their preferred channels (e.g., email, structured templates). All submitted data will be tracked and updated on the backend. Information collected during this process — including invoice details, contractor credentials, and work certification — will be used to create a virtual payment profile for each contractor, enabling efficient tracking, validation, and disbursement.

# **CORE FEATURES**

- Portals for each stakeholder/related parties - (Contractors/suppliers, Government agencies, Ministry of Finance, One Africa Markets)
- Invoice Discount calculator that features the number of discountable tenors and their corresponding discount rates.
- Invoice upload feature with joint verification ability for the contractors
- Data storage hub for OA and Agencies to have access to generate reports, track data and carry out some data analysis.
- A secured and robust portal that saves clients data in a safe and secure way for reports and data analysis.

# **USER INTERFACE/PROCESSFLOW**

## Login/Admin Specifications

- No sign-up option available for agencies, MoF, AG, or OA team
- Custom URLs for different user types:
  - Contractor Portal: Standard login with sign-up option
  - Agency Logins: Custom URLs for each agency (e.g., /agency/getfund, /agency/nhis, /agency/roadfund)
  - Ministry of Finance: Custom URL (/mof)
  - Auditor General: Custom URL (/ag)
  - OA Portal: Custom URL (/oa)
- Password reset functionality available for all user types after initial login
- Secure authentication and session management across all portals

## Contractor/Supplier

## _First Time User Sign Up Flow_

- Contractor clicks on Contractor portal on the landing page.
- Sign Up/Sign In window pops-up
- Contractor enters sign up details:
  - Basic Info - Company Name, Contact Person, Email Address, Phone Number, Business Type, Region.
  - Accept Terms and Conditions, create an account.
- Client is forwarded to the dashboard, after a few seconds, an onboarding window pops up requesting to commence the onboarding process.
  - Company Details - Onboarding Questionnaire
    - Registration Details - Registered Name, Registration Date, Registration Number, Type of Company (Plc, Llc, etc), Country of Registration
    - License Details - License Number, Expiry Date (optional)
    - Bank Details - Bank Name, Account Number, Account Name, Branch, Sort Code
    - File Upload
      - Incorporation Docs - Memorandum & Articles of Association (optional), Certificate of Incorporation, PPA Certificate (optional)
      - Company profile, including management team and organizational structure
      - Company proof of address (e.g., utility bill or bank statement dated within the last three months)
      - Regulatory body under which the company operates and license to operate (if applicable)
      - Source of funds (e.g., three months' bank statements or audited financial statements dated within the last six months)
  - Shareholders/UBOs
    - Shareholding structure (UBO details for anyone holding more than 10%)
    - Shareholder and director register
    - Valid identification (passport) and proof of address (dated within the last three months) for key directors and shareholders

### _Returning User Sign In Flow_

- Contractor clicks on Contractor portal on the landing page.
- Sign In window pops-up
- Contractor enters sign in details
- Client is forwarded to the dashboard - can upload invoice, have access to historical invoice uploads and paid advances, reports, notifications and account settings.
- New Invoice Submission
  - Click on "Submit New Invoice"
  - Invoice Details -
    - Agency type,
    - Contract Name,
    - Contract Number,
    - Project Description,
    - Invoice Amount (GH₵) - with proper comma formatting validation,
    - Work Completion %,
    - Invoice Date, Due Date,
    - Choosing Invoice discounting term (30 day, 60 day, 90 day, 120 day, 180 day),
    - Advance amount - calculated using the specific discount rate for the selected term by the invoice amount - using the discounting formula.
  - Document Upload - Invoice, Award Contract, Interim Payment Certificate, and other relevant project documents
  - Bank Account Selection - Contractor can select from multiple added bank accounts for payment
  - Summary page with ability to review all details before submission

### _Contractor Dashboard_

- Metric tabs for Total Invoices submitted, Outstanding Advance Payments, Total Advance Payments
- A column for Recent Uploaded Invoices with filter to group by date, payment status, progress/approval status
- Average Processing Time
- Quick actions - Advance Payments Received, Download Report, View Profile Settings
- Help Bubble

### _My Invoices Window_

- Invoice Management table with columns: Contract, Invoice Amount, Advance Amount, Status, Date
- Filter functionality by contract name and other parameters
- Detailed view for each invoice with full submission details

### _Advance Payments Received_

- Outstanding Advance Payments - showing pending advance payments
- Total Advance Payments - cumulative advance payments received
- Payment history with detailed transaction records

## Ministry of Finance

- MoF sign in with details shared with MoF team, which they sign in with and reset password
- Custom URL for MoF login
- Dashboard which will display -
  - Monthly Disbursements to OA,
  - Number of Active Agencies,
  - YTD Budget Utilization,
  - Agency Allocation Performance
- Clicking on Agencies Tab displays info on each agency and their budget utilization performance
- Funding Management Tab helps review and approve agency funding allocations that MoF provides to agencies OA engages with
- Reporting & Analytics Tab (merged) - contains advanced filters and analytics tools for allocation tracking, budget performance, and disbursement analysis

## Agency Section

### _Agency Selection and Login_

- Selectable list of agencies before sign-in section (GETFund, NHIS, RoadFund, etc.)
- Agency-specific sign-in (not sign-up) with ability to reset password after signing in
- Custom URLs for each agency login

### _Agency Dashboard_

- All agencies have a dashboard which will display - metrics of invoices approved, payouts to OA, Total number of invoices outstanding & percentage of allocation used out of total allocation
- "Invoices Requiring Immediate Action" section shows invoices for review only (no quick approvals)

### _Invoice Approvals_

- Clicking on the approvals tab shows a window with 3 clickable sections on the side - approved, pending, rejected
- Multiple filter and sort buttons available for every column under Pending, Approved, and Rejected invoice tabs
- Invoices grouped according to projects with expandable/collapsible project tabs
- A main expandable table with a list of invoices compiled under categories of projects
- Clicking on an invoice reveals full details of the invoice with two verification stages - one for the verification of the details filled and another for the documents submitted
- This then qualifies as a fully approved invoice or if some details need correction there are comments that can be left and a reason for the partial approval or total rejection

### _Payments Window_

- Data on payouts from OA to contractors for approved invoices
- Data on payouts from specific agencies to OA
- Agencies can upload Proof of Payments for specific payouts - say for approved project specific categories
- This provides data and reports on payments made by agencies to OA
- Record keeping and confirmation of all payment transactions

## OA Portal

- OA sign in details shared, and password will be reset after initial sign in
- Custom URL for OA team login
- Portal reveals a dashboard with tabs showing metrics of:
  - Total invoices submitted across all agencies
  - Total advance payments disbursed
  - Active contracts and contractors
  - Agency performance metrics
- The portal should be able to generate DECs (Disbursement Execution Certificates) for approved invoices by specific agencies
- Recording details of payments to specific invoices and sharing such payment data with specific agencies
- Submit Proof of Payment of specific invoices with automated notifications
- Send payment confirmations via email and SMS to contractors/suppliers from the portal
- Comprehensive reporting and analytics dashboard for OA team operations
- Invoice tracking and status management across all agencies
- Contractor onboarding and verification management

## Auditor General Section

- AG sign in details shared with AG team, which they sign in with and reset password
- Custom URL for AG login
- Dashboard with metric tabs for -
  - Active Audit Cases,
  - Flagged Invoices,
  - Amount Under Review,
  - Compliances,
  - Critical Cases,
  - Risk Assessment Overview
- Audit Cases icon that helps manage and track cases according to Agencies that are uploaded for investigation
- Invoice Register icon with a filter to segregate Invoice schedule into categories based on the search function
- Reporting & Analytics Tab (merged) to pull data, view, generate and download reports including:
  - Audit Trail,
  - Risk Assessment,
  - Custom Query,
  - Compliance Summary,
  - Data analysis based on prompts,
  - Advanced analytics tools
- Anomalies tab to detect and highlight suspicious activities and irregularities
- Notifications and Settings button

# **INTEGRATIONS**

- GHANEPS (Ghana Electronic Procurement System)