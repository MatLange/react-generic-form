import "../styles/tailwind.css";
import "../styles/netdna.bootstrapcdn.com_bootstrap_4.5.2_css_bootstrap.min.css";
import { AppProps } from "next/app";
import 'dayjs/locale/de';
import { deDE } from '@mui/x-date-pickers/locales';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { supabase } from '../datahandling/databasehandling';
import dynamic from 'next/dynamic';
import { Auth} from "@supabase/ui";

// dynamic import to disable Server side rendering for Supabase UserContextProvider, since there were some issues
// with the hydration: "Error: Hydration failed because the initial UI does not match what was rendered on the server."
const UserContextProvider  = dynamic(() => import("@supabase/ui").then((mod) => mod.Auth.UserContextProvider), { ssr: false });

const germanLocale = deDE.components.MuiLocalizationProvider.defaultProps.localeText;
function MyApp({ Component, pageProps }: AppProps) {
  return (
      <LocalizationProvider         dateAdapter={AdapterDayjs}
      adapterLocale="de"
      localeText={germanLocale}>
        <UserContextProvider supabaseClient={supabase} suppressHydrationWarning={true} >
          <Component {...pageProps} />
        </UserContextProvider>  
      </LocalizationProvider>      
  )
}

export default MyApp
