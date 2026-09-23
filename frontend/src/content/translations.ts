export type Language = "en" | "mr";

export interface Milestone {
  year: string;
  title: string;
  text: string;
}

export interface CeremonyContent {
  title: string;
  subtitle: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  note: string;
}

export interface Translation {
  meta: { title: string };
  mangalacharan: {
    line1: string;
    line2: string;
    tagline: string;
  };
  nav: {
    story: string;
    timeline: string;
    venue: string;
    gallery: string;
    rsvp: string;
  };
  hero: {
    pretitle: string;
    groomLabel: string;
    groom: string;
    connector: string;
    brideLabel: string;
    bride: string;
    subtitle: string;
    date: string;
    venue: string;
    cta: string;
  };
  countdown: {
    pretitle: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
  coupleIntro: {
    pretitle: string;
    title: string;
    groom: { label: string; name: string; parents: string; description: string };
    bride: { label: string; name: string; parents: string; description: string };
  };
  story: {
    pretitle: string;
    title: string;
    milestones: Milestone[];
  };
  timelineOverview: {
    pretitle: string;
    title: string;
    steps: { label: string; date: string }[];
  };
  ceremonies: {
    haldi: CeremonyContent;
    mehendi: CeremonyContent;
    sangeet: CeremonyContent;
    vivah: CeremonyContent;
    reception: CeremonyContent;
  };
  venue: {
    pretitle: string;
    title: string;
    name: string;
    address: string;
    description: string;
    directionsCta: string;
  };
  gallery: {
    pretitle: string;
    title: string;
    subtitle: string;
  };
  rsvp: {
    pretitle: string;
    title: string;
    subtitle: string;
    nameLabel: string;
    emailLabel: string;
    attendingLabel: string;
    yes: string;
    no: string;
    guestsLabel: string;
    messageLabel: string;
    submit: string;
    thankYou: string;
  };
  family: {
    pretitle: string;
    title: string;
    groomFamily: string;
    brideFamily: string;
    message: string;
  };
  blessing: {
    verse: string;
    title: string;
    note: string;
    tagline: string;
    copyright: string;
  };
}

export const translations: Record<Language, Translation> = {
  en: {
    meta: { title: "Yash & Vaishnavi | Shubh Vivah" },
    mangalacharan: {
      line1: "Shree Ganeshaya Namah",
      line2: "\u0950",
      tagline: "Shubh Vivah",
    },
    nav: {
      story: "Our Story",
      timeline: "Events",
      venue: "Venue",
      gallery: "Gallery",
      rsvp: "RSVP",
    },
    hero: {
      pretitle: "Together with their families",
      groomLabel: "Chi.",
      groom: "Yash",
      connector: "weds",
      brideLabel: "Chi. Sau. Kum.",
      bride: "Vaishnavi",
      subtitle: "Request the honour of your presence at their wedding",
      date: "27th December 2026",
      venue: "Shree Mangal Karyalaya, Pune, Maharashtra",
      cta: "RSVP Now",
    },
    countdown: {
      pretitle: "Counting down to the auspicious muhurat",
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
    },
    coupleIntro: {
      pretitle: "With Blessings Of Shree Ganesh",
      title: "The Couple",
      groom: {
        label: "The Groom",
        name: "Chi. Yash Deshmukh",
        parents: "Son of Shri. Anil Deshmukh & Smt. Sunita Deshmukh",
        description:
          "A software engineer with a love for classical music and trekking through the Sahyadris.",
      },
      bride: {
        label: "The Bride",
        name: "Chi. Sau. Kum. Vaishnavi Patil",
        parents: "Daughter of Shri. Suresh Patil & Smt. Manisha Patil",
        description:
          "An architect who finds joy in Paithani weaves, Kathak, and long conversations over chai.",
      },
    },
    story: {
      pretitle: "Our Journey",
      title: "Our Story",
      milestones: [
        {
          year: "2019",
          title: "First Met",
          text: "We met by chance at a mutual friend's engagement and talked all evening.",
        },
        {
          year: "2022",
          title: "Families United",
          text: "Our families met over tea and blessed our bond with their love.",
        },
        {
          year: "2025",
          title: "Sakhar Puda",
          text: "We got engaged in a small, joyful ceremony with our closest family.",
        },
        {
          year: "2026",
          title: "Shubh Vivah",
          text: "Now we can't wait to begin our new journey with your blessings.",
        },
      ],
    },
    timelineOverview: {
      pretitle: "Wedding Celebrations",
      title: "Ceremony Timeline",
      steps: [
        { label: "Haldi", date: "25 Dec, Morning" },
        { label: "Mehendi", date: "25 Dec, Evening" },
        { label: "Sangeet", date: "26 Dec, Evening" },
        { label: "Wedding Ceremony", date: "27 Dec, Morning" },
        { label: "Reception", date: "27 Dec, Evening" },
      ],
    },
    ceremonies: {
      haldi: {
        title: "Haldi",
        subtitle: "The turmeric ceremony blesses the couple with a golden glow.",
        date: "25th December 2026",
        time: "10:00 AM",
        venue: "Family Residence Lawns",
        address: "Shree Mangal Karyalaya Lawns, Pune",
        note: "Wear yellow — turmeric ceremony for the bride and groom.",
      },
      mehendi: {
        title: "Mehendi",
        subtitle: "An evening of intricate henna art, music, and laughter.",
        date: "25th December 2026",
        time: "4:00 PM",
        venue: "Shree Mangal Karyalaya Lawns",
        address: "Pune, Maharashtra",
        note: "Henna, music, and mocktails for the ladies' sangeet evening.",
      },
      sangeet: {
        title: "Sangeet",
        subtitle: "A night of music and dance to celebrate the union of two families.",
        date: "26th December 2026",
        time: "7:00 PM",
        venue: "Shree Mangal Karyalaya Banquet Hall",
        address: "Pune, Maharashtra",
        note: "An evening of music, dance performances and celebration.",
      },
      vivah: {
        title: "Wedding Ceremony",
        subtitle: "The sacred rites are performed at the auspicious muhurat.",
        date: "27th December 2026",
        time: "10:30 AM (Muhurat)",
        venue: "Shree Mangal Karyalaya",
        address: "Pune, Maharashtra",
        note: "Please be seated 15 minutes before the auspicious muhurat.",
      },
      reception: {
        title: "Reception",
        subtitle: "An evening of dinner and celebration with our loved ones.",
        date: "27th December 2026",
        time: "7:00 PM",
        venue: "Shree Mangal Karyalaya Banquet Hall",
        address: "Pune, Maharashtra",
        note: "Dinner and celebration to follow the wedding ceremony.",
      },
    },
    venue: {
      pretitle: "Where To Celebrate",
      title: "Venue",
      name: "Shree Mangal Karyalaya",
      address: "Near Ganesh Chowk, Pune, Maharashtra 411001",
      description:
        "A traditional banquet hall with lush lawns, ideal for every ceremony from Haldi to Reception.",
      directionsCta: "Get Directions",
    },
    gallery: {
      pretitle: "Memories",
      title: "Gallery",
      subtitle: "Replace these placeholders with your favorite photos together.",
    },
    rsvp: {
      pretitle: "Kindly Respond",
      title: "RSVP",
      subtitle:
        "We would be honoured to have you join us. Please respond by 1st December 2026.",
      nameLabel: "Full Name",
      emailLabel: "Email",
      attendingLabel: "Will you be attending?",
      yes: "Joyfully Accept",
      no: "Regretfully Decline",
      guestsLabel: "Number of Guests",
      messageLabel: "Message (optional)",
      submit: "Send RSVP",
      thankYou: "Thank you! Your RSVP has been received.",
    },
    family: {
      pretitle: "With Great Joy",
      title: "Family Invitation",
      groomFamily: "Shri. Anil & Smt. Sunita Deshmukh",
      brideFamily: "Shri. Suresh & Smt. Manisha Patil",
      message:
        "Together with their families, request the honour of your gracious presence, blessings and good wishes at the wedding of their children.",
    },
    blessing: {
      verse: "\u0950 \u0938\u0930\u094D\u0935\u0947 \u092D\u0935\u0928\u094D\u0924\u0941 \u0938\u0941\u0916\u093F\u0928\u0903 \u0964",
      title: "Shubham Bhavatu",
      note: "May this union be blessed with love, happiness, and prosperity always.",
      tagline: "We can't wait to celebrate with you.",
      copyright: "\u00A9 2026 \u00B7 With Love, Yash & Vaishnavi",
    },
  },
  mr: {
    meta: { title: "यश आणि वैष्णवी | शुभविवाह" },
    mangalacharan: {
      line1: "॥ श्री गणेशाय नमः ॥",
      line2: "\u0950",
      tagline: "शुभविवाह",
    },
    nav: {
      story: "कहाणी",
      timeline: "कार्यक्रम",
      venue: "ठिकाण",
      gallery: "फोटो",
      rsvp: "RSVP",
    },
    hero: {
      pretitle: "दोन्ही परिवारांतर्फे",
      groomLabel: "चि.",
      groom: "यश",
      connector: "वेड्स",
      brideLabel: "चि. सौ. कां.",
      bride: "वैष्णवी",
      subtitle: "आपल्या उपस्थितीने आमच्या लग्न सोहळ्याची शोभा वाढवावी ही विनंती",
      date: "२७ डिसेंबर २०२६",
      venue: "श्री मंगल कार्यालय, पुणे, महाराष्ट्र",
      cta: "उपस्थिती नोंदवा",
    },
    countdown: {
      pretitle: "शुभ मुहूर्तापर्यंत उर्वरित वेळ",
      days: "दिवस",
      hours: "तास",
      minutes: "मिनिटे",
      seconds: "सेकंद",
    },
    coupleIntro: {
      pretitle: "श्री गणेशाच्या आशीर्वादाने",
      title: "वधू-वर",
      groom: {
        label: "वर",
        name: "चि. यश देशमुख",
        parents: "श्री. अनिल देशमुख आणि सौ. सुनिता देशमुख यांचा सुपुत्र",
        description:
          "सॉफ्टवेअर अभियंता असून शास्त्रीय संगीत आणि सह्याद्रीच्या डोंगररांगांमध्ये भटकंतीची विशेष आवड.",
      },
      bride: {
        label: "वधू",
        name: "चि. सौ. कां. वैष्णवी पाटील",
        parents: "श्री. सुरेश पाटील आणि सौ. मनिषा पाटील यांची सुकन्या",
        description:
          "वास्तुविशारद असून पैठणी, कथ्थक नृत्य आणि चहावरील गप्पांमध्ये मनापासून रमते.",
      },
    },
    story: {
      pretitle: "आमचा प्रवास",
      title: "आमची प्रेमकहाणी",
      milestones: [
        {
          year: "२०१९",
          title: "पहिली भेट",
          text: "एका मित्राच्या साखरपुड्यात योगायोगाने आमची भेट झाली आणि रात्रभर गप्पा रंगल्या.",
        },
        {
          year: "२०२२",
          title: "कुटुंबांची भेट",
          text: "आमच्या दोन्ही कुटुंबांनी एकत्र भेटून आमच्या नात्याला आशीर्वाद दिला.",
        },
        {
          year: "२०२५",
          title: "साखरपुडा",
          text: "जवळच्या नातेवाईकांच्या उपस्थितीत आमचा साखरपुडा संपन्न झाला.",
        },
        {
          year: "२०२६",
          title: "शुभ विवाह",
          text: "आता आपल्या सर्वांच्या आशीर्वादाने आमच्या नव्या प्रवासाला सुरुवात करण्यास आम्ही उत्सुक आहोत.",
        },
      ],
    },
    timelineOverview: {
      pretitle: "विवाह सोहळा",
      title: "कार्यक्रमांचे वेळापत्रक",
      steps: [
        { label: "हळद", date: "२५ डिसें, सकाळ" },
        { label: "मेहंदी", date: "२५ डिसें, संध्याकाळ" },
        { label: "संगीत", date: "२६ डिसें, संध्याकाळ" },
        { label: "विवाह सोहळा", date: "२७ डिसें, सकाळ" },
        { label: "स्वागत समारंभ", date: "२७ डिसें, संध्याकाळ" },
      ],
    },
    ceremonies: {
      haldi: {
        title: "हळद",
        subtitle: "वधू-वरांना हळदीच्या सुवर्ण उटण्याने आशीर्वादित करणारा मंगल विधी.",
        date: "२५ डिसेंबर २०२६",
        time: "सकाळी १०:००",
        venue: "निवासस्थान लॉन्स",
        address: "श्री मंगल कार्यालय लॉन्स, पुणे",
        note: "पिवळे वस्त्र परिधान करावे — वधू-वरांचा हळदीचा कार्यक्रम.",
      },
      mehendi: {
        title: "मेहंदी",
        subtitle: "नाजूक मेहंदी कलाकुसर, संगीत आणि आनंदाची संध्याकाळ.",
        date: "२५ डिसेंबर २०२६",
        time: "दुपारी ४:००",
        venue: "श्री मंगल कार्यालय लॉन्स",
        address: "पुणे, महाराष्ट्र",
        note: "मेहंदी, संगीत आणि मैत्रिणींसाठी खास संध्याकाळ.",
      },
      sangeet: {
        title: "संगीत",
        subtitle: "दोन्ही कुटुंबांच्या मीलनाचा आनंद साजरा करणारी संगीतमय रात्र.",
        date: "२६ डिसेंबर २०२६",
        time: "संध्याकाळी ७:००",
        venue: "श्री मंगल कार्यालय सभागृह",
        address: "पुणे, महाराष्ट्र",
        note: "संगीत, नृत्य सादरीकरण आणि आनंदोत्सवाची संध्याकाळ.",
      },
      vivah: {
        title: "विवाह सोहळा",
        subtitle: "शुभ मुहूर्तावर पार पडणारे पवित्र विवाह विधी.",
        date: "२७ डिसेंबर २०२६",
        time: "सकाळी १०:३० (मुहूर्त)",
        venue: "श्री मंगल कार्यालय",
        address: "पुणे, महाराष्ट्र",
        note: "शुभ मुहूर्ताच्या १५ मिनिटे आधी स्थानापन्न व्हावे ही विनंती.",
      },
      reception: {
        title: "स्वागत समारंभ",
        subtitle: "आप्तस्वकीयांसह स्नेहभोजन आणि आनंदोत्सवाची संध्याकाळ.",
        date: "२७ डिसेंबर २०२६",
        time: "संध्याकाळी ७:००",
        venue: "श्री मंगल कार्यालय सभागृह",
        address: "पुणे, महाराष्ट्र",
        note: "विवाह सोहळ्यानंतर स्नेहभोजन आणि आनंदोत्सव.",
      },
    },
    venue: {
      pretitle: "सोहळ्याचे ठिकाण",
      title: "ठिकाण",
      name: "श्री मंगल कार्यालय",
      address: "गणेश चौकाजवळ, पुणे, महाराष्ट्र ४११००१",
      description:
        "हिरव्यागार लॉन्ससह पारंपरिक सभागृह, हळदीपासून स्वागत समारंभापर्यंत सर्व विधींसाठी योग्य.",
      directionsCta: "दिशादर्शन पहा",
    },
    gallery: {
      pretitle: "आठवणी",
      title: "फोटो",
      subtitle: "या जागी आपले आवडते फोटो जोडा.",
    },
    rsvp: {
      pretitle: "कृपया कळवा",
      title: "उपस्थिती नोंदवा",
      subtitle:
        "आपण उपस्थित राहावे ही मनापासून इच्छा आहे. कृपया १ डिसेंबर २०२६ पर्यंत कळवा.",
      nameLabel: "पूर्ण नाव",
      emailLabel: "ईमेल",
      attendingLabel: "आपण उपस्थित राहणार का?",
      yes: "आनंदाने स्वीकार",
      no: "क्षमस्व, येऊ शकणार नाही",
      guestsLabel: "पाहुण्यांची संख्या",
      messageLabel: "निरोप (ऐच्छिक)",
      submit: "पाठवा",
      thankYou: "धन्यवाद! आपला निरोप मिळाला आहे.",
    },
    family: {
      pretitle: "अत्यंत आनंदाने",
      title: "कुटुंबातर्फे निमंत्रण",
      groomFamily: "श्री. अनिल व सौ. सुनिता देशमुख",
      brideFamily: "श्री. सुरेश व सौ. मनिषा पाटील",
      message:
        "आमच्या मुलांच्या शुभविवाह सोहळ्यास सहकुटुंब सहपरिवार उपस्थित राहून नवदांपत्यास आशीर्वाद द्यावेत, ही आपणांस आग्रहाचे निमंत्रण.",
    },
    blessing: {
      verse: "॥ ॐ सर्वे भवन्तु सुखिनः ॥",
      title: "शुभं भवतु",
      note: "या नव्या नात्याला प्रेम, आनंद आणि भरभराटीचे सदैव आशीर्वाद लाभावेत.",
      tagline: "आपल्यासोबत हा आनंद साजरा करण्यास आम्ही उत्सुक आहोत.",
      copyright: "\u00A9 २०२६ \u00B7 प्रेमासह, यश आणि वैष्णवी",
    },
  },
};
