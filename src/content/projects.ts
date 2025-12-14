import TruckIcon from "../components/icons/TruckIcon.astro";
import AcademicCapIcon from "../components/icons/AcademicCapIcon.astro";
import BankNotesIcon from "../components/icons/BankNotesIcon.astro";
import RocketLaunchIcon from "../components/icons/RocketLaunchIcon.astro";
import DocumentCharBarIcon from "../components/icons/DocumentChartBarIcon.astro";
import HomeModernIcon from "../components/icons/HomeModernIcon.astro";
import CloudIcon from "../components/icons/CloudIcon.astro";
import BuildingIcon from "../components/icons/BuildingIcon.astro";
import BriefcaseIcon from "../components/icons/BriefcaseIcon.astro";

type Project = {
    id: string;
    title: string;
    desc: string;
    icon: any;
    tech: string[];
}

export const projects: Project[] = [
    {
        id: "a-team",
        title: "A-Team Dashboard",
        desc: "A unified information platform for providing intelligence related to short-term rental properties in various markets and property management systems (PMS).",
        icon: BuildingIcon,
        tech: [
            "Golang",
            "Echo",
            "SSE",
            "PostgreSQL",
            "Hostaway SDK",
            "React",
            "Typescript",
            "TailwindCSS",
            "Hostinger VPS",
        ],
    },
    {
        id: "fn-integrator",
        title: "Function Integrator",
        desc: "A unified system for businesses to keep stack of their IT assets and infrastructure to assist in executive decision-making.",
        icon: CloudIcon,
        tech: [
            "Golang",
            "Chi",
            "GraphQL",
            "PostgreSQL",
            "Neo4j",
            "Auth0",
            "AWS SDK",
            "GCP SDK",
            "Azure SDK",
        ],
    },
    {
        id: "meritorious",
        title: "Meritorious Consultants",
        desc: "Business website for a consulting firm which provides accounting and bookeeping services.",
        icon: BriefcaseIcon,
        tech: ["NodeJS", "Typescript", "HonoJS", "TailwindCSS", "Sqlite3"],
    },
    {
        id: "dms",
        title: "Delivery Management System",
        desc: "Management and scheduling of construction site resources, personnel management and live-tracking of incoming delivery vehicles.",
        icon: TruckIcon,
        tech: [
            "NodeJS",
            "NextJS",
            "Fastify",
            "PostgreSQL",
            "Prisma",
            "Typescript",
            "TailwindCSS",
        ],
    },
    {
        id: "lab-on-web",
        title: "Lab on web",
        desc: "Learning Management System (LMS) targeted at science students. Includes physics simulations and student progress and performance tracking.",
        icon: AcademicCapIcon,
        tech: [
            "NodeJS",
            "NextJS",
            "KoaJS",
            "MongoDB",
            "AWS S3",
            "AWS SES",
            "Typescript",
        ],
    },
    {
        id: "loannerd",
        title: "Loannerd",
        desc: "Easy application of automotive loan, loan application processing, document management, tracking, and approval though affiliate banks.",
        icon: BankNotesIcon,
        tech: [
            "NodeJS",
            "Express",
            "NextJS",
            "MongoDB",
            "AWS S3",
            "AWS SES",
            "Typescript",
            "Ant Design",
        ],
    },
    {
        id: "octane-club",
        title: "Octane Club",
        desc: "Platform for buying and selling of high-end luxury cars, targeted at dealerships.",
        icon: RocketLaunchIcon,
        tech: ["PHP", "Laravel", "MySQL", "VueJS", "Javascript", "TailwindCSS"],
    },
    {
        id: "doxy",
        title: "Doxy",
        desc: "Generate legal documents from dynamic templates and obtain e-signatures from other users.",
        icon: DocumentCharBarIcon,
        tech: ["PHP", "Laravel", "MySQL", "VueJS", "Javscript", "Vuetify"],
    },
    {
        id: "aptzy",
        title: "Aptzy",
        desc: "Apartment search and renting, with features for third-party amenities providers.",
        icon: HomeModernIcon,
        tech: ["PHP", "Laravel", "MySQL", "VueJS", "Javascript", "Bootstrap"],
    },
];

export const projectIds = projects.map((project) => project.id);