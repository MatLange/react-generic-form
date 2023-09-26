   export function getDatePattern(locale:any) {
        // expected style = year: 2010, month: 12, day: 31
        const options = { year: "numeric", month: "2-digit", day: "2-digit" } as any;
      
        // formatToParts() returns array of object breaking down the locales dateformat
        // [ 
        //  {type: "month", value: "03"},
        //  {type: "literal", value: "/"},
        //  {type: "day", value: "30"},
        //  {type: "literal", value: "/"},
        //  {type: "year", value: "2021"},
        // ]
        const formatter = new Intl.DateTimeFormat(locale, options).formatToParts();
      
        return formatter.map(function(e) {
            switch(e.type) {
              case 'month':
                return 'MM'; break;
              case 'day':
                return 'DD'; break;
              case 'year':
                return 'YYYY'; break;
              default: 
                return e.value;
            }
          }).join('');
      }

    export const userLang = Intl.DateTimeFormat().resolvedOptions().locale;
    export const localeDatePattern = getDatePattern(userLang || "en");  
