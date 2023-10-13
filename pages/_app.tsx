import "../styles/tailwind.css";
import "../styles/netdna.bootstrapcdn.com_bootstrap_4.5.2_css_bootstrap.min.css";
import { AppProps } from "next/app";
import 'dayjs/locale/de';
import { deDE } from '@mui/x-date-pickers/locales';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const germanLocale = deDE.components.MuiLocalizationProvider.defaultProps.localeText;
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LocalizationProvider         dateAdapter={AdapterDayjs}
    adapterLocale="de"
    localeText={germanLocale}>
        <Component {...pageProps} />
    </LocalizationProvider>        
  )
}

export default MyApp
