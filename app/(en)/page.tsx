import { en } from "../i18n/en";
import { homeMetadata } from "../i18n/metadata";
import Home from "../components/Home";

export const metadata = homeMetadata(en);

export default function EnglishHome() {
  return <Home t={en} />;
}
