import { IdentityAttackLogo } from "./svgs/identity-attack";
import { InsultLogo } from "./svgs/insult";
import { ProfanityLogo } from "./svgs/profanity";
import { SevereToxicLogo } from "./svgs/severe-toxic";
import { ThreatLogo } from "./svgs/threat";
import { ToxicLogo } from "./svgs/toxic";

export const featuresData = [
    {
        attr: "toxicity",
        title: "Toxicity",
        icon: <ToxicLogo />,
        description: "A rude, disrespectful, or unreasonable comment.",
    },
    {
        attr: "severeToxicity",
        title: "Severe Toxicity",
        icon: <SevereToxicLogo />,
        description: "An extremely hateful, aggressive or disrespectful comment.",
    },
    {
        attr: "identityAttack",
        title: "Identity attack",
        icon: <IdentityAttackLogo />,
        description: "Negative or hateful comments targeting someone because of their identity.",
    },
    {
        attr: "insult",
        title: "Insult",
        icon: <InsultLogo />,
        description: "Insulting, inflammatory, or negative comment towards a person or a group of people.",
    },
    {
        attr: "profanity",
        title: "Profanity",
        icon: <ProfanityLogo />,
        description: "Swear words, curse words, or other obscene or profane language.",
    },
    {
        attr: "threat",
        title: "Threat",
        icon: <ThreatLogo />,
        description: "Describes an intention to inflict pain, injury, or violence against an individual or group.",
    },
];
