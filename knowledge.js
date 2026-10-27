
"use strict";

window.COTTON_KNOWLEDGE = {
  products: [
    {
      id: "small",
      title: "Idly Ravva (Small Cut)",
      telugu: "ఇడ్లీ రవ్వ — చిన్న కట్ (సనమ్)",
      description: "SVR FOOD PRODUCTS Idly Ravva. Contact SVR for current price and availability.",
      variants: [
        { size: "1 kg", image: "assets/products/idly-ravva-small-cut-1kg.jpg" },
        { size: "5 kg", image: "assets/products/idly-ravva-small-cut-5kg.jpg" },
        { size: "30 kg", image: "assets/products/idly-ravva-small-cut-30kg.jpg" },
        { size: "50 kg", image: "assets/products/idly-ravva-small-cut-50kg.jpg" }
      ]
    },
    {
      id: "big",
      title: "Idly Ravva (Big Cut)",
      telugu: "ఇడ్లీ రవ్వ — పెద్ద కట్ (ముతక)",
      description: "SVR FOOD PRODUCTS Idly Ravva. Contact SVR for current price and availability.",
      variants: [
        { size: "1 kg", image: "assets/products/idly-ravva-big-cut-1kg.jpg" },
        { size: "5 kg", image: "assets/products/idly-ravva-big-cut-5kg.jpg" },
        { size: "30 kg", image: "assets/products/idly-ravva-big-cut-30kg.jpg" },
        { size: "50 kg", image: "assets/products/idly-ravva-big-cut-50kg.jpg" }
      ]
    },
    {
      id: "rice",
      title: "Rice Ravva",
      telugu: "బియ్యం రవ్వ",
      description: "Rice Ravva is listed in a 500 g pack. Contact SVR for availability.",
      variants: [
        { size: "500 g", image: "assets/products/rice-ravva-500g.jpg" }
      ]
    },
    {
      id: "urad",
      title: "Urad Gota / Minapagullu",
      telugu: "మినపగుళ్లు",
      description: "SVR FOOD PRODUCTS Urad Gota. Available separately and in the special combination.",
      variants: [
        { size: "1 kg", image: "assets/products/urad-gota-1kg.jpg" }
      ]
    }
  ],

  combination: {
    name: "1 + 5 COTTON SPECIAL COMBINATION",
    ravva: "1 kg Idly Ravva",
    urad: "200 g Urad Gota",
    estimatedYield: "Approximately 80 idlis (promotional estimate)",
    costClaim: "₹1 per idli raw-material estimate only; other preparation costs are excluded."
  },

  recipes: {
    timingsStatus: "Draft guidance — not company-approved",
    soakUrad: "Generic starting guidance: soak Urad Gota for about 4–6 hours. Confirm with SVR before publishing as official advice.",
    grind: "Grind soaked Urad Gota with water to a smooth, airy batter. Add water gradually.",
    ravva: "Prepare Idly Ravva according to the selected recipe.",
    ferment: "Generic starting guidance: fermentation may take around 8–12 hours depending on conditions. This is not official SVR guidance.",
    steam: "Generic starting guidance: steam idlis for around 10–15 minutes depending on mould size and equipment. Verify doneness.",
    caution: "Recipe timings are draft guidance and must be validated by the company before being described as official."
  },

  contacts: {
    whatsapp1: "919491084447",
    whatsapp2: "919866948633",
    phone: "+916301354654",
    email: "support@svrfoods.com",
    website: "https://www.svrfoodproducts.com/",
    app: "https://play.google.com/store/apps/details?id=com.absolin.svrfoods"
  },

  addresses: [
    "Sri Vijaya Durga Industries, R.S. No. 145/2, Anaparthi Road, Ramavaram (V), Anaparthi Mandal, E.G. District, Andhra Pradesh.",
    "Sri Venkata Rama Food Products, R.S. No. 86, Rajanagaram Road, Duppalapudi (V), Anaparthi Mandal, E.G. District, Andhra Pradesh."
  ],

  faq: [
    {
      keys: ["combination", "కాంబినేషన్", "1+5", "1 + 5", "special combo", "కాటన్ స్పెషల్"],
      answer: {
        te: "మన 1 + 5 COTTON SPECIAL COMBINATIONలో 1 kg Idly Ravva + 200 g Urad Gota ఉంటాయి. ప్రచార అంచనా ప్రకారం సుమారు 80 ఇడ్లీలు రావచ్చు. వాస్తవ సంఖ్య మారవచ్చు.",
        en: "The 1 + 5 COTTON SPECIAL COMBINATION contains 1 kg Idly Ravva + 200 g Urad Gota. The promotional estimate is approximately 80 idlis; actual yield may vary."
      }
    },
    {
      keys: ["price", "ధర", "rate", "cost", "రేటు", "bulk price", "బల్క్ ధర"],
      answer: {
        te: "ప్రస్తుత ధరలు, bulk rates, availability కోసం WhatsApp చేయండి: +91 94910 84447 లేదా +91 98669 48633.",
        en: "For current prices, bulk rates and availability, WhatsApp +91 94910 84447 or +91 98669 48633."
      }
    },
    {
      keys: ["bulk", "dealer", "wholesale", "బల్క్", "డీలర్", "హోల్‌సేల్", "orders", "ఆర్డర్"],
      answer: {
        te: "Bulk orders కోసం SVR Foods App ఉపయోగించండి లేదా +91 94910 84447 / +91 98669 48633కు WhatsApp చేయండి.",
        en: "For bulk orders, use the SVR Foods App or WhatsApp +91 94910 84447 / +91 98669 48633."
      }
    },
    {
      keys: ["small cut", "sanam", "చిన్న కట్", "సనమ్"],
      answer: {
        te: "SVR Idly Ravva Small Cut (Sanam) 1 kg, 5 kg, 30 kg, 50 kg pack sizesలో జాబితా చేయబడింది. ప్రస్తుత stock, ధర కోసం సంప్రదించండి.",
        en: "SVR Idly Ravva Small Cut (Sanam) is listed in 1 kg, 5 kg, 30 kg and 50 kg packs. Contact SVR to confirm current stock and price."
      }
    },
    {
      keys: ["big cut", "muthaka", "పెద్ద కట్", "ముతక"],
      answer: {
        te: "SVR Idly Ravva Big Cut (Muthaka) 1 kg, 5 kg, 30 kg, 50 kg pack sizesలో జాబితా చేయబడింది. ప్రస్తుత stock, ధర కోసం సంప్రదించండి.",
        en: "SVR Idly Ravva Big Cut (Muthaka) is listed in 1 kg, 5 kg, 30 kg and 50 kg packs. Contact SVR to confirm current stock and price."
      }
    },
    {
      keys: ["rice ravva", "బియ్యం రవ్వ"],
      answer: {
        te: "Rice Ravva 500 g packగా జాబితా చేయబడింది. ప్రస్తుత availability కోసం SVRను సంప్రదించండి.",
        en: "Rice Ravva is listed in a 500 g pack. Contact SVR to confirm availability."
      }
    },
    {
      keys: ["urad", "gota", "minapagullu", "మినపగుళ్లు", "మినప గుళ్లు"],
      answer: {
        te: "SVR Urad Gota (మినపగుళ్లు) 1 kg packగా, అలాగే 1 + 5 Cotton Special Combinationలో భాగంగా జాబితా చేయబడింది.",
        en: "SVR Urad Gota is listed in a 1 kg pack and is also included in the 1 + 5 Cotton Special Combination."
      }
    },
    {
      keys: ["soak", "soaking", "నానబెట్ట", "నానబెట్టడం"],
      answer: {
        te: "Draft సూచన: మినపగుళ్లను సుమారు 4–6 గంటలు నానబెట్టడం సాధారణ ప్రారంభ సూచన మాత్రమే. ఇది అధికారిక SVR recipe timing కాదు.",
        en: "Draft guidance: soaking Urad Gota for about 4–6 hours is a generic starting suggestion, not an official SVR recipe time."
      }
    },
    {
      keys: ["ferment", "fermentation", "పులియ", "పులియబెట్ట"],
      answer: {
        te: "Fermentation సమయం వాతావరణం, batter పరిస్థితులపై ఆధారపడి మారుతుంది. 8–12 గంటలు draft estimate మాత్రమే; అధికారిక SVR సూచన కాదు.",
        en: "Fermentation time varies with temperature and batter conditions. 8–12 hours is only a draft estimate, not official SVR guidance."
      }
    },
    {
      keys: ["steam", "steaming", "వేడి", "ఆవిరి", "ఇడ్లీ ఉడక"],
      answer: {
        te: "ఇడ్లీ steaming సమయం mould size, equipmentపై ఆధారపడి మారుతుంది. 10–15 నిమిషాలు draft estimate మాత్రమే; verify చేయండి.",
        en: "Idli steaming time depends on mould size and equipment. 10–15 minutes is only a draft estimate; verify it with your preparation method."
      }
    },
    {
      keys: ["hard idli", "గట్టిగా", "మెత్తగా", "soft idli", "ఇడ్లీ గట్టిగా"],
      answer: {
        te: "ఇడ్లీ texture batter consistency, fermentation, grinding, steaming వంటి అంశాలపై ఆధారపడి ఉంటుంది. Recipe timings ఇంకా draftలో ఉన్నాయి.",
        en: "Idli texture depends on batter consistency, fermentation, grinding and steaming. Recipe timings are still draft guidance."
      }
    },
    {
      keys: ["80 idli", "80 idlis", "ఎనభై", "ఎన్ని ఇడ్లీలు"],
      answer: {
        te: "1 + 5 Cotton Special Combination కోసం సుమారు 80 ఇడ్లీలు అనేది ప్రచార అంచనా. వాస్తవ సంఖ్య మారవచ్చు.",
        en: "Approximately 80 idlis is the promotional estimate for the 1 + 5 Cotton Special Combination. Actual yield may vary."
      }
    },
    {
      keys: ["one rupee", "₹1", "ఒక రూపాయి", "రూపాయి ఇడ్లీ", "cost per idli"],
      answer: {
        te: "₹1 per idli అనేది ముడి పదార్థాల ప్రచార అంచనా మాత్రమే. Gas, labour, water, electricity వంటి ఇతర ఖర్చులు ఇందులో లేవు.",
        en: "₹1 per idli is an advertised raw-material estimate only. Fuel, labour, water, electricity and other costs are excluded."
      }
    },
    {
      keys: ["app", "download", "డౌన్‌లోడ్", "మొబైల్ యాప్"],
      answer: {
        te: "SVR Foods App కోసం ఈ లింక్ తెరవండి: https://play.google.com/store/apps/details?id=com.absolin.svrfoods",
        en: "Open the SVR Foods App on Google Play: https://play.google.com/store/apps/details?id=com.absolin.svrfoods"
      }
    },
    {
      keys: ["website", "వెబ్‌సైట్", "site"],
      answer: {
        te: "మా website: https://www.svrfoodproducts.com/",
        en: "Our website: https://www.svrfoodproducts.com/"
      }
    },
    {
      keys: ["contact", "whatsapp", "ఫోన్", "సంప్రదించ", "నంబర్"],
      answer: {
        te: "WhatsApp: +91 94910 84447 లేదా +91 98669 48633. Office: +91 63013 54654. Email: support@svrfoods.com",
        en: "WhatsApp: +91 94910 84447 or +91 98669 48633. Office: +91 63013 54654. Email: support@svrfoods.com"
      }
    }
  ]
};
        
