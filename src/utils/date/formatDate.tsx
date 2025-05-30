interface options {
    lang: string,
    yearType:string
}

export function formatDateLocalized(datetimeStr:string, options: options) {
  const {
    lang = "th", // 'th' = ภาษาไทย, 'en' = ภาษาอังกฤษ
    yearType = "BE", // 'BE' = พ.ศ., 'AD' = ค.ศ.
  } = options;

  const date = new Date(datetimeStr);

  const thaiMonths = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  const englishMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  const month =
    lang === "th" ? thaiMonths[monthIndex] : englishMonths[monthIndex];
  const displayYear = yearType === "BE" && lang === "th" ? year + 543 : year;

  return `${day} ${month} ${displayYear}`;
}

export function formatDateTimeLocalized(datetimeStr:string, options:options) {
    const {
      lang = 'th',     // 'th' = ภาษาไทย, 'en' = ภาษาอังกฤษ
      yearType = 'BE'  // 'BE' = พ.ศ., 'AD' = ค.ศ.
    } = options;
  
    const date = new Date(datetimeStr);
  
    const thaiMonths = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
      "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];
  
    const englishMonths = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');
  
    const month = lang === 'th' ? thaiMonths[monthIndex] : englishMonths[monthIndex];
    const displayYear = (yearType === 'BE' && lang === 'th') ? year + 543 : year;
  
    return `${day} ${month} ${displayYear} ${hour}:${minute}:${second}`;
  }

  export function parseDateByMode(
    dateString: string | any,
    mode:
      | "getdate"
      | "getmonth"
      | "getyear"
      | "gethours"
      | "getminutes"
      | "getseconds"
      | "getmilliseconds"
      | "getday"
      | "toisostring"
      | "tolocalestring"
      | "getfullyear"
      | "getfullmonth"
      | "getfulldate"
      | "getstartofweek"
      | "getendofweek"
      | "getthaifull"
  ): string | number | null {
    const date = new Date(dateString);
  
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date format");
    }
  
    switch (mode.toLowerCase()) {
      case "getdate":
        return date.getDate();
      case "getmonth":
        return date.getMonth() + 1;
      case "getyear":
        return date.getFullYear();
      case "gethours":
        return date.getHours();
      case "getminutes":
        return date.getMinutes();
      case "getseconds":
        return date.getSeconds();
      case "getmilliseconds":
        return date.getMilliseconds();
      case "getday":
        return date.getDay();
      case "toisostring":
        return date.toISOString();
      case "tolocalestring":
        return date.toLocaleString();
      case "getfullyear":
        return `${date.getFullYear()}`;
      case "getfullmonth":
        return `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}`;
      case "getfulldate":
        return `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
      case "getstartofweek": {
        const startOfWeek = new Date(date);
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        startOfWeek.setDate(diff);
        return `${startOfWeek.getFullYear()}-${(startOfWeek.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${startOfWeek
          .getDate()
          .toString()
          .padStart(2, "0")}`;
      }
      case "getendofweek": {
        const endOfWeek = new Date(date);
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? 0 : 7);
        endOfWeek.setDate(diff);
        return `${endOfWeek.getFullYear()}-${(endOfWeek.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${endOfWeek.getDate().toString().padStart(2, "0")}`;
      }
      case "getthaifull": {
        const thaiMonths = [
          "มกราคม",
          "กุมภาพันธ์",
          "มีนาคม",
          "เมษายน",
          "พฤษภาคม",
          "มิถุนายน",
          "กรกฎาคม",
          "สิงหาคม",
          "กันยายน",
          "ตุลาคม",
          "พฤศจิกายน",
          "ธันวาคม"
        ];
        const day = date.getDate();
        const month = thaiMonths[date.getMonth()];
        const year = date.getFullYear() + 543; // แปลง ค.ศ. เป็น พ.ศ.
        return `${day} ${month} ${year}`;
      }
      default:
        return null;
    }
  }

  
  