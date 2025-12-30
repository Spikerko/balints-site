import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const translations = {
    en: {
        translation: {
            home: {
                card: {
                    title: "there is nothing here unc",
                    description: "imma redirect u to my Sitee",
                }
            },
            notFound: {
                text: "Not Found",
                back: "Go Back"
            },
            siteeRedirection: {
                redirectingIn: "redirecting in {i}",
                redirectingDone: "redirecting now"
            },
            footer: {
                siteMadeBy: "Site made by {i}"
            }
        }
    },
    sk: {
        translation: {
            home: {
                card: {
                    title: "nic tu neni unc",
                    description: "poslem ta na moj Sitee",
                }
            },
            notFound: {
                text: "Not Found",
                back: "Späť"
            },
            siteeRedirection: {
                redirectingIn: "poslem ta za {i}",
                redirectingDone: "posielam ta teraz"
            },
            footer: {
                siteMadeBy: "Webstránku vytvoril {i}"
            }
        }
    },
    hu: {
        translation: {
            home: {
                card: {
                    title: "itt lowk nincs semmi unc",
                    description: "atiranyitalak a Sitee-omra ocskos",
                }
            },
        },
    }
};

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        fallbackLng: "en",
        resources: translations,
    })