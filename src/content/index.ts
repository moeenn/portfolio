import AwsIcon from "../assets/img/tools/aws.svg";
import BashIcon from "../assets/img/tools/bash.svg";
import CSSIcon from "../assets/img/tools/css.svg";
import DockerIcon from "../assets/img/tools/docker.svg";
import ExpressIcon from "../assets/img/tools/express.svg";
import GCPIcon from "../assets/img/tools/gcp.svg";
import GitIcon from "../assets/img/tools/git.svg";
import GithubIcon from "../assets/img/tools/github.svg";
import GolangIcon from "../assets/img/tools/golang.svg";
import GraphqlIcon from "../assets/img/tools/graphql.svg";
import HtmlIcon from "../assets/img/tools/html.svg";
import JiraIcon from "../assets/img/tools/jira.svg";
import JsIcon from "../assets/img/tools/js.svg";
import LinuxIcon from "../assets/img/tools/linux.svg";
import MongodbIcon from "../assets/img/tools/mongodb.svg";
import MysqlIcon from "../assets/img/tools/mysql.svg";
import Neo4jIcon from "../assets/img/tools/neo4j.svg";
import NextjsIcon from "../assets/img/tools/nextjs.svg";
import NestjsIcon from "../assets/img/tools/nestjs.svg";
import NodejsIcon from "../assets/img/tools/nodejs.svg";
import PostgresqlIcon from "../assets/img/tools/postgresql.svg";
import PythonIcon from "../assets/img/tools/python.svg";
import RabbitmqIcon from "../assets/img/tools/rabbitmq.svg";
import ReactIcon from "../assets/img/tools/react.svg";
import TailwindIcon from "../assets/img/tools/tailwind.svg";
import TypescriptIcon from "../assets/img/tools/typescript.svg";
import VueIcon from "../assets/img/tools/vue.svg";
import MiscIcon from "../assets/img/tools/misc.svg";
import HostingerIcon from "../assets/img/tools/hostinger.svg";
import Auth0Icon from "../assets/img/tools/auth0.svg";
import GPTIcon from "../assets/img/tools/gpt.svg";
import WhisperIcon from "../assets/img/tools/whisper.svg";
import StripeIcon from "../assets/img/tools/stripe.svg";
import FFmpegIcon from "../assets/img/tools/ffmpeg.svg";
import PrismaIcon from "../assets/img/tools/prisma.svg";
import SqliteIcon from "../assets/img/tools/sqlite.svg";
import VuetifyIcon from "../assets/img/tools/vuetify.svg";
import BootstrapIcon from "../assets/img/tools/bootstrap.svg";
import type { SvgComponent } from "astro/types";

import TruckIcon from "../components/icons/TruckIcon.astro";
import AcademicCapIcon from "../components/icons/AcademicCapIcon.astro";
import BankNotesIcon from "../components/icons/BankNotesIcon.astro";
import RocketLaunchIcon from "../components/icons/RocketLaunchIcon.astro";
import DocumentCharBarIcon from "../components/icons/DocumentChartBarIcon.astro";
import HomeModernIcon from "../components/icons/HomeModernIcon.astro";
import CloudIcon from "../components/icons/CloudIcon.astro";
import BuildingIcon from "../components/icons/BuildingIcon.astro";
import BriefcaseIcon from "../components/icons/BriefcaseIcon.astro";
import UsersIcon from "../components/icons/UsersIcon.astro";
import SparklesIcon from "../components/icons/SparklesIcon.astro";

export type Tech = {
	name: string;
	icon: SvgComponent & ImageMetadata;
};

export type Project = {
	id: string;
	title: string;
	desc: string;
	features: string[];
	icon: any;
	tech: Tech[];
	imageCount: number;
};

const Golang: Tech = {
	name: "Golang",
	icon: GolangIcon,
};

const Javascript: Tech = {
	name: "Javascript",
	icon: JsIcon,
};

const Typescript: Tech = {
	name: "Typescript",
	icon: TypescriptIcon,
};

const NodeJS: Tech = {
	name: "NodeJS",
	icon: NodejsIcon,
};

const React: Tech = {
	name: "React",
	icon: ReactIcon,
};

const VueJS: Tech = {
	name: "VueJS",
	icon: VueIcon,
};

const TailwindCSS: Tech = {
	name: "TailwindCSS",
	icon: TailwindIcon,
};

const Docker: Tech = {
	name: "Docker",
	icon: DockerIcon,
};

const PostgreSQL: Tech = {
	name: "PostgreSQL",
	icon: PostgresqlIcon,
};

const Python: Tech = {
	name: "Python",
	icon: PythonIcon,
};

const Express: Tech = {
	name: "Express",
	icon: ExpressIcon,
};

const NextJS: Tech = {
	name: "NextJS",
	icon: NextjsIcon,
};

const NestJS: Tech = {
	name: "NestJS",
	icon: NestjsIcon,
};

const GraphQL: Tech = {
	name: "GraphQL",
	icon: GraphqlIcon,
};

const MongoDB: Tech = {
	name: "MongoDB",
	icon: MongodbIcon,
};

const MySQL: Tech = {
	name: "MySQL",
	icon: MysqlIcon,
};

const Neo4j: Tech = {
	name: "Neo4j",
	icon: Neo4jIcon,
};

const RabbitMQ: Tech = {
	name: "RabbitMQ",
	icon: RabbitmqIcon,
};

const Linux: Tech = {
	name: "Linux",
	icon: LinuxIcon,
};

const Bash: Tech = {
	name: "Bash",
	icon: BashIcon,
};

const Html: Tech = {
	name: "HTML",
	icon: HtmlIcon,
};

const CSS: Tech = {
	name: "CSS",
	icon: CSSIcon,
};

const Git: Tech = {
	name: "Git",
	icon: GitIcon,
};

const Github: Tech = {
	name: "Github",
	icon: GithubIcon,
};

const Jira: Tech = {
	name: "Jira",
	icon: JiraIcon,
};

const AWS: Tech = {
	name: "AWS",
	icon: AwsIcon,
};

const GCP: Tech = {
	name: "GCP",
	icon: GCPIcon,
};

const SSE: Tech = {
	name: "Server-sent events",
	icon: MiscIcon,
};

const HostingerVPS: Tech = {
	name: "Hostinger VPS",
	icon: HostingerIcon,
};

const Echo: Tech = {
	name: "Echo",
	icon: MiscIcon,
};

const Chi: Tech = {
	name: "Chi",
	icon: MiscIcon,
};

const Auth0: Tech = {
	name: "Auth0",
	icon: Auth0Icon,
};

const GPT: Tech = {
	name: "OpenAI GPT-3.5",
	icon: GPTIcon,
};

const Whisper: Tech = {
	name: "OpenAI Whisper",
	icon: WhisperIcon,
};

const DID: Tech = {
	name: "DID",
	icon: MiscIcon,
};

const Stripe: Tech = {
	name: "Stripe",
	icon: StripeIcon,
};

const FFmpeg: Tech = {
	name: "FFmpeg",
	icon: FFmpegIcon,
};

const Prisma: Tech = {
	name: "Prisma ORM",
	icon: PrismaIcon,
};

const S3: Tech = {
	name: "AWS S3",
	icon: AwsIcon,
};

const SES: Tech = {
	name: "AWS SES",
	icon: AwsIcon,
};

const AWSSDK: Tech = {
	name: "AWS SDK",
	icon: AwsIcon,
};

const GCPSDK: Tech = {
	name: "GCP SDK",
	icon: GCPIcon,
};

const ANTDesign: Tech = {
	name: "ANT Design",
	icon: MiscIcon,
};

const HonoJS: Tech = {
	name: "HonoJS",
	icon: MiscIcon,
};

const Sqlite: Tech = {
	name: "Sqlite3",
	icon: SqliteIcon,
};

const Vuetify: Tech = {
	name: "Vuetify",
	icon: VuetifyIcon,
};

const Bootstrap: Tech = {
	name: "Bootstrap",
	icon: BootstrapIcon,
};

export const tools = [
	{
		title: "Focus in",
		tools: [
			Golang,
			Javascript,
			Typescript,
			NodeJS,
			React,
			TailwindCSS,
			Docker,
			PostgreSQL,
		],
	},
	{
		title: "Good knowledge",
		tools: [
			Python,
			Express,
			NextJS,
			NestJS,
			VueJS,
			GraphQL,
			MongoDB,
			MySQL,
			Neo4j,
			RabbitMQ,
			Linux,
			Bash,
			Html,
			CSS,
			Git,
			Github,
			Jira,
		],
	},
	{
		title: "Clouds",
		tools: [AWS, GCP],
	},
];

export const projects: Project[] = [
	{
		id: "a-team",
		title: "A-Team Dashboard",
		desc: "A unified platform for providing business intelligence related to short-term rental properties across various markets and property management systems (PMS).",
		icon: BuildingIcon,
		imageCount: 9,
		tech: [
			Golang,
			Echo,
			SSE,
			PostgreSQL,
			React,
			Typescript,
			TailwindCSS,
			HostingerVPS,
			Docker,
		],
		features: [
			"System Integration: Achieves seamless, automated data synchronization with leading Property Management Systems (PMS) and channels, including Airbnb, Hostaway, and Hospitable, ensuring periodic and timely updates of all new listing and performance data.",
			"Client Transparency: Provides a secure, client-facing dashboard with delegated read-access, allowing property owners to monitor the performance and key metrics of their listings with complete transparency.",
			"Performance Analytics: Delivers comprehensive, market-relative performance reports and visual charts, highlighting a wide spectrum of Key Performance Indicators (KPIs) to provide actionable insights into listing efficacy and competitive standing.",
		],
	},
	{
		id: "fn-integrator",
		title: "Function Integrator",
		desc: "A centralized system for businesses to keep track of their IT assets and infrastructure, assisting in executive decision-making, planning and cost-optimizations.",
		icon: CloudIcon,
		imageCount: 1,
		tech: [
			Golang,
			Chi,
			GraphQL,
			PostgreSQL,
			Neo4j,
			Auth0,
			AWSSDK,
			GCPSDK,
			Docker,
		],
		features: [
			"Offers native, deep integration with leading cloud providers, specifically Amazon Web Services (AWS) and Google Cloud Platform (GCP).",
			"Supports the manual management and configuration of on-premises IT assets, ensuring comprehensive visibility across hybrid environments.",
			"Automatically discovers, maps, and inventories detailed asset information across a wide spectrum of services for all integrated cloud platforms.",
			"Collects detailed AWS data spanning essential services, including: EC2, S3, Lambda, CloudFront, RDS, Redshift, VPC, Sagemaker, ECS, EKS, SNS, and SQS, among others.",
			"Gathers comprehensive GCP asset intelligence from services such as: Compute Engine, Kubernetes Engine, Cloud Functions, Cloud Storage, Cloud SQL, BigQuery, VPC, Load Balancing, and Vertex AI.",
			"Offers flexible data synchronization mechanisms, supporting both on-demand (one-time) synchronization and real-time, event-based updates.",
			"Facilitates flexible and powerful reporting through a dedicated GraphQL API, allowing users to query and analyze all ingested asset information.",
		],
	},
	{
		id: "hr-ai",
		title: "HR-AI",
		desc: "Leverage the power of AI to transform your recruitment process. This platform empowers businesses to automate screening, conduct AI-driven interviews based on customized parameters, and generate insightful feedback for informed hiring decisions.",
		icon: SparklesIcon,
		imageCount: 6,
		tech: [
			NodeJS,
			Express,
			PostgreSQL,
			Typescript,
			TailwindCSS,
			GPT,
			Whisper,
			DID,
			Stripe,
			FFmpeg,
			Docker,
		],
		features: [
			"Implemented front-end functionality enabling direct video recording via webcam and utilizing FFmpeg for efficient audio extraction.",
			"Achieved high-accuracy audio transcription by integrating the OpenAI Whisper model.",
			"Enabled businesses to define custom interview questions or leverage the OpenAI GPT-3.5 model for intelligent, auto-generated questions.",
			"Generates realistic interviewer avatar videos using the D-ID platform, processed asynchronously via background queues.",
			"Successfully integrated the Stripe payment gateway for secure and seamless payment processing.",
		],
	},
	{
		id: "dms",
		title: "Delivery Management System",
		desc: "A system for managing and reserving construction-related resources and shipments of raw materials for construction projects. Project also includes live-tracking of delivery vehicles, real-time dashboard and options for redirecting vehicles.",
		icon: TruckIcon,
		imageCount: 10,
		tech: [
			NodeJS,
			NextJS,
			Express,
			PostgreSQL,
			Prisma,
			Typescript,
			TailwindCSS,
			Docker,
		],
		features: [
			"Features an intuitive, drag-and-drop deliveries calendar for effortless rescheduling and dynamic planning of logistics workflow.",
			"Provides comprehensive personnel management capabilities for site access roles (e.g., Gatekeepers) and subcontractors, supporting flexible assignment across multiple construction sites.",
			"Facilitates accurate $\text{CO}_2$ emissions tracking by calculating the carbon footprint of various vehicle types using validated government APIs and data sources.",
			"Offers insightful analytics dashboards featuring dynamic charts and graphs that provide a comprehensive overview and deep operational intelligence for every construction site.",
			"Incorporates a dedicated Python microservice to generate rich, high-quality reports in essential formats, including PDF, Excel, and CSV.",
			"Enables live, real-time location tracking for all delivery vehicles, complete with their current status, destination, and estimated time of arrival.",
			"Provides optimized route visualization for drivers, promoting efficient navigation, reduced travel time, and reliable delivery schedules.",
			"Implements dynamic routing capabilities, including the ability to temporarily divert vehicles to off-site holding areas via instantaneous updates to the driver's mobile app, preventing site congestion.",
			"Ensures real-time delivery transparency as drivers can seamlessly mark deliveries as completed upon arrival, instantly updating the central system.",
		],
	},
	{
		id: "lab-on-web",
		title: "Lab on web",
		desc: "Learning Management System (LMS) targeted at STEM students. Includes physics simulations and student progress and performance tracking.",
		icon: AcademicCapIcon,
		imageCount: 9,
		tech: [NodeJS, NextJS, Express, MongoDB, S3, SES, Typescript, Docker],
		features: [
			"Provides role-based dashboards tailored for Institutes, Teachers, and Students, ensuring each user group has access to the specific features and data relevant to their function.",
			"Site Administrators maintain centralized control over institutional membership, enabling the swift onboarding of new Institutes and the ability to suspend access in cases of non-compliance or payment disputes.",
			"Institute Administrators possess comprehensive organizational tools to manage their entire academic structure, including user provisioning (teachers and students), cataloging courses, teacher assignments, and the generation of structured course schedules.",
			"Teachers are equipped to dynamically create and integrate scientific simulations into their courses and assignments. Furthermore, they can manage the grading workflow by viewing student submissions, assigning grades, and initiating dedicated feedback threads on submitted work.",
			"Students can independently enroll in available courses, receive timely periodic assignments, and seamlessly submit their completed work directly within the platform.",
			"Features an integrated real-time notification system that instantly alerts users across all roles to relevant platform events, actions, and critical updates.",
		],
	},
	{
		id: "loannerd",
		title: "Loannerd",
		desc: "Easy application of automotive loan, loan application processing, document management, tracking, and approval though affiliate banks.",
		icon: BankNotesIcon,
		imageCount: 6,
		tech: [
			NodeJS,
			Express,
			NextJS,
			MongoDB,
			S3,
			SES,
			Typescript,
			ANTDesign,
			Docker,
		],
		features: [
			"Multi-Step Application Workflow: Implements a structured and intuitive loan application process that guides users through required steps, ensuring accurate and efficient submission completion.",
			"Advanced Application Management Console: Provides a robust dashboard enabling administrators and dealers to effortlessly monitor, process, and manage loan applications.",
			"Seamless Document Processing and Compliance: Facilitates secure document uploads, real-time verification checks, and automated compliance management for smooth loan processing.",
			"External Financial API Integration: Connects with external financial institutions to facilitate pre-approved loan checks, real-time credit scoring, and automated eligibility assessments.",
			"Integrated Communication Suite: Features built-in messaging with file attachment capabilities, real-time chat support, and automated notifications for status updates and reminders.",
			"Personalized Real-Time Alerts: Users receive instant updates on application status, necessary actions, and announcements via integrated email, SMS, and in-app notifications.",
			"Integrated Marketing and Engagement Tools: Keeps users engaged with promotional content, financial insights, and personalized offers through a built-in newsletter and marketing system.",
			"Intelligent Loan Comparison Engine: Features a smart system that suggests the optimal loan options and tailored recommendations based on the user’s financial profile and specific requirements.",
			"Granular Role-Based Access Control (RBAC): Ensures data security and system integrity by assigning distinct permission levels for clients, dealers, and administrators.",
			"Responsive and Scalable Architecture: Features a fully responsive design optimized for seamless use across all desktop and mobile devices, built to scale robustly with business expansion.",
		],
	},
	{
		id: "octane-club",
		title: "Octane Club",
		desc: "Platform for buying and selling of high-end luxury cars, targeted at dealerships.",
		icon: RocketLaunchIcon,
		imageCount: 6,
		tech: [NodeJS, NestJS, PostgreSQL, React, Typescript, TailwindCSS],
		features: [
			"This exclusive online marketplace serves as a dedicated transaction hub for professional resellers of luxury and high-performance sports cars.",
			"Vehicle Listing Management: Enables the creation of detailed, showcase-quality listings to present inventory of high-performance vehicles.",
			"Reseller Network & Collaboration: Facilitates secure communication and transactions by allowing users to browse listings and connect directly within a trusted network of certified resellers.",
			"Streamlined User Experience: Provides a platform optimized for efficiency, including features like integrated image compression to minimize listing upload times.",
			"Real-Time Security Watermarking: Listings automatically display the current user's name as a dynamic watermark, effectively deterring the unauthorized copying and misuse of vehicle images.",
			"Centralized Administration: Features a robust Admin Control Panel for comprehensive platform governance, enabling administrators to securely manage user access and maintain listing integrity.",
			"This platform delivers a secure, efficient, and specialized solution for high-end sports car resellers to connect, accelerate collaboration, and sustainably expand their business operations.",
		],
	},
	{
		id: "meritorious",
		title: "Meritorious Consultants",
		desc: "Business website with blogging features for a consulting firm which provides accounting and bookeeping services.",
		icon: BriefcaseIcon,
		imageCount: 6,
		tech: [NodeJS, Typescript, HonoJS, TailwindCSS, Sqlite, HostingerVPS],
		features: [
			"Blogging Engine: Features a streamlined content creation workflow, allowing quick publication of blog posts authored in Markdown, which are converted to fast-loading HTML for the public-facing site.",
			"Service Portfolio: Clearly presents the full spectrum of specialized business offerings across dedicated, informative service pages.",
			"Conversion Optimization: Includes an intuitive booking feature enabling prospective clients to schedule and confirm consultations easily.",
			"Speed and SEO: Ensures a premium user experience and superior search engine performance by leveraging server-side rendering and aggressive compression for rapid page delivery.",
		],
	},
	{
		id: "doxy",
		title: "Doxy",
		desc: "Generate legal documents from dynamic templates and obtain e-signatures from other users.",
		icon: DocumentCharBarIcon,
		imageCount: 6,
		tech: [NodeJS, Express, PostgreSQL, VueJS, Javascript, Vuetify],
		features: [
			"Dynamic Template Creation: Enables the creation of dynamic document templates by uploading existing PDF files and organizing all required input fields into logical question groups.",
			"Interactive Form Generation: Presents question groups as a dynamically generated multi-step form, featuring an option for live preview of the document as the user fills in the data.",
			"Template Marketplace Integration: Allows users to list and monetize their custom document templates within the platform's dedicated marketplace.",
			"Legal Document Generation: Facilitates the instant generation of legal documents using both proprietary user templates and templates acquired from the marketplace.",
			"Digital Signature Request: Allows users to request digital signatures by entering recipient email addresses. Non-platform users are prompted to register securely before they can sign the document.",
			"Signature Placement Flexibility: Provides the capability to embed a signature image onto the document and to apply a validated e-signature directly to the final PDF file.",
		],
	},
	{
		id: "aptzy",
		title: "Aptzy",
		desc: "Apartment search and renting, with features for third-party amenities providers.",
		icon: HomeModernIcon,
		imageCount: 6,
		tech: [NodeJS, Express, PostgreSQL, VueJS, Javascript, Bootstrap],
		features: [
			"Advanced Search Capabilities: Locate ideal properties quickly using our powerful search engine, featuring up to 15 granular criteria covering location, price range, amenities, and specific policies like pet allowances.",
			"Interactive Neighborhood Visualization: Explore and discover rental opportunities on our interactive map, allowing users to visually identify properties that align perfectly with their lifestyle and location needs.",
			"Effortless Listing Management: Landlords can easily add and maintain their rental portfolios through a dedicated admin panel, ensuring all property details are accurate and optimized to attract prospective tenants.",
			"Focus on Conversion: We connect you directly with qualified renters; secure payments and booking logistics are then handled off-platform, allowing you to concentrate solely on filling vacancies and property management.",
			"This platform streamlines and simplifies the entire rental ecosystem, providing a convenient, all-in-one solution for both tenants seeking their next home and landlords focused on efficient property management.",
		],
	},
	{
		id: "align",
		title: "Align",
		desc: "A simple platform for connecting professionals with job seekers looking for career advice and collaboration.",
		icon: UsersIcon,
		imageCount: 7,
		tech: [NodeJS, Express, PostgreSQL, Typescript, TailwindCSS],
		features: [
			"User Profile Management: Facilitates account creation and detailed profile onboarding for both Seekers (clients) and Professionals (consultants).",
			"Experience and Career History: Enables users to accurately document and showcase their professional experience and complete career history.",
			"Consultation Booking: Allows Seekers to efficiently search for and secure consultation bookings with qualified Professionals.",
		],
	},
];

export const projectIds = projects.map((project) => project.id);
