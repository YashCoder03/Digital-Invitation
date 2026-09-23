import type { Language } from "./translations";

export type OccasionId =
  | "birthday"
  | "engagement"
  | "housewarming"
  | "babyshower"
  | "anniversary"
  | "religious"
  | "celebration";

export type AccentName = "gold" | "red" | "sage" | "blush" | "maroon" | "terracotta";

export interface OccasionEvent {
  title: string;
  date: string;
  time: string;
  venue: string;
  note: string;
}

export interface OccasionTemplateContent {
  meta: { title: string };
  invocation: string;
  hero: {
    pretitle: string;
    title: string;
    subtitle: string;
    date: string;
    venue: string;
    cta: string;
  };
  highlights: {
    pretitle: string;
    title: string;
    events: OccasionEvent[];
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
  closing: {
    title: string;
    note: string;
    tagline: string;
    copyright: string;
  };
}

export const occasionTemplates: Record<OccasionId, Record<Language, OccasionTemplateContent>> = {
  birthday: {
    en: {
      meta: { title: "Ishaan's First Birthday" },
      invocation: "Shree Ganeshaya Namah",
      hero: {
        pretitle: "You're Invited To",
        title: "Ishaan's First Birthday",
        subtitle: "A little celebration for our biggest joy — join us for cake, games and fun!",
        date: "14th February 2027",
        venue: "Deshpande Residence, Kothrud, Pune",
        cta: "RSVP Now",
      },
      highlights: {
        pretitle: "The Celebration",
        title: "Birthday Programme",
        events: [
          {
            title: "Welcome & Snacks",
            date: "14th Feb 2027",
            time: "5:00 PM",
            venue: "Deshpande Residence Lawn",
            note: "Arrive a little early to say hello!",
          },
          {
            title: "Cake Cutting",
            date: "14th Feb 2027",
            time: "6:00 PM",
            venue: "Deshpande Residence Lawn",
            note: "The big moment — cameras ready!",
          },
          {
            title: "Games & Dinner",
            date: "14th Feb 2027",
            time: "6:30 PM",
            venue: "Deshpande Residence Lawn",
            note: "Fun games for the little ones, followed by dinner.",
          },
        ],
      },
      gallery: {
        pretitle: "Memories",
        title: "Gallery",
        subtitle: "Replace these placeholders with your favourite photos.",
      },
      rsvp: {
        pretitle: "Kindly Respond",
        title: "RSVP",
        subtitle: "Please let us know if you can join the celebration by 10th February 2027.",
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
      closing: {
        title: "Shubham Bhavatu",
        note: "May this little one always be surrounded by love and laughter.",
        tagline: "We can't wait to celebrate with you.",
        copyright: "\u00A9 2027 \u00B7 With Love, The Deshpande Family",
      },
    },
    mr: {
      meta: { title: "ईशानचा पहिला वाढदिवस" },
      invocation: "\u0936\u094d\u0930\u0940 \u0917\u0923\u0947\u0936\u093e\u092f \u0928\u092e\u0903",
      hero: {
        pretitle: "आपणांस निमंत्रण",
        title: "ईशानचा पहिला वाढदिवस",
        subtitle: "आमच्या सर्वात मोठ्या आनंदाचा उत्सव — केक, खेळ आणि मौजमजेसाठी सहभागी व्हा!",
        date: "१४ फेब्रुवारी २०२७",
        venue: "देशपांडे निवासस्थान, कोथरूड, पुणे",
        cta: "उपस्थिती नोंदवा",
      },
      highlights: {
        pretitle: "उत्सव",
        title: "वाढदिवस कार्यक्रम",
        events: [
          {
            title: "स्वागत व नाश्ता",
            date: "१४ फेब्रुवारी २०२७",
            time: "संध्याकाळी ५:००",
            venue: "देशपांडे निवासस्थान लॉन",
            note: "थोडे आधी येऊन आमच्यासोबत वेळ घालवा.",
          },
          {
            title: "केक कापणे",
            date: "१४ फेब्रुवारी २०२७",
            time: "संध्याकाळी ६:००",
            venue: "देशपांडे निवासस्थान लॉन",
            note: "खास क्षण — कॅमेरे सज्ज ठेवा!",
          },
          {
            title: "खेळ व स्नेहभोजन",
            date: "१४ फेब्रुवारी २०२७",
            time: "संध्याकाळी ६:३०",
            venue: "देशपांडे निवासस्थान लॉन",
            note: "लहान मुलांसाठी मजेदार खेळ, त्यानंतर स्नेहभोजन.",
          },
        ],
      },
      gallery: {
        pretitle: "आठवणी",
        title: "फोटो",
        subtitle: "या जागी आपले आवडते फोटो जोडा.",
      },
      rsvp: {
        pretitle: "कृपया कळवा",
        title: "उपस्थिती नोंदवा",
        subtitle: "कृपया १० फेब्रुवारी २०२७ पर्यंत आपल्या उपस्थितीबद्दल कळवा.",
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
      closing: {
        title: "शुभं भवतु",
        note: "या बाळाभोवती सदैव प्रेम आणि आनंद राहो.",
        tagline: "आपल्यासोबत हा आनंद साजरा करण्यास आम्ही उत्सुक आहोत.",
        copyright: "\u00A9 २०२७ \u00B7 प्रेमासह, देशपांडे परिवार",
      },
    },
  },
  engagement: {
    en: {
      meta: { title: "Ananya & Rohan | Sakhar Puda" },
      invocation: "Shree Ganeshaya Namah",
      hero: {
        pretitle: "Together with their families",
        title: "Ananya weds Rohan",
        subtitle: "Request the honour of your presence at their Sakhar Puda ceremony",
        date: "8th February 2027",
        venue: "Shree Mangal Karyalaya, Pune, Maharashtra",
        cta: "RSVP Now",
      },
      highlights: {
        pretitle: "The Ceremony",
        title: "Engagement Programme",
        events: [
          {
            title: "Sakhar Puda",
            date: "8th Feb 2027",
            time: "11:00 AM",
            venue: "Shree Mangal Karyalaya",
            note: "The formal exchange of sweets between both families.",
          },
          {
            title: "Ring Ceremony",
            date: "8th Feb 2027",
            time: "12:00 PM",
            venue: "Shree Mangal Karyalaya",
            note: "The exchange of rings between Ananya & Rohan.",
          },
          {
            title: "Family Lunch",
            date: "8th Feb 2027",
            time: "1:00 PM",
            venue: "Shree Mangal Karyalaya Banquet Hall",
            note: "A festive lunch to celebrate the new bond.",
          },
        ],
      },
      gallery: {
        pretitle: "Memories",
        title: "Gallery",
        subtitle: "Replace these placeholders with your favourite photos together.",
      },
      rsvp: {
        pretitle: "Kindly Respond",
        title: "RSVP",
        subtitle: "We would be honoured to have you join us. Please respond by 1st February 2027.",
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
      closing: {
        title: "Shubham Bhavatu",
        note: "May this new bond be blessed with love and happiness always.",
        tagline: "We can't wait to celebrate with you.",
        copyright: "\u00A9 2027 \u00B7 With Love, Ananya & Rohan",
      },
    },
    mr: {
      meta: { title: "अनया आणि रोहन | साखरपुडा" },
      invocation: "\u0936\u094d\u0930\u0940 \u0917\u0923\u0947\u0936\u093e\u092f \u0928\u092e\u0903",
      hero: {
        pretitle: "दोन्ही परिवारांतर्फे",
        title: "अनया वेड्स रोहन",
        subtitle: "आपल्या उपस्थितीने आमच्या साखरपुडा सोहळ्याची शोभा वाढवावी ही विनंती",
        date: "८ फेब्रुवारी २०२७",
        venue: "श्री मंगल कार्यालय, पुणे, महाराष्ट्र",
        cta: "उपस्थिती नोंदवा",
      },
      highlights: {
        pretitle: "सोहळा",
        title: "साखरपुडा कार्यक्रम",
        events: [
          {
            title: "साखरपुडा",
            date: "८ फेब्रुवारी २०२७",
            time: "सकाळी ११:००",
            venue: "श्री मंगल कार्यालय",
            note: "दोन्ही कुटुंबांमध्ये साखरेची औपचारिक देवाणघेवाण.",
          },
          {
            title: "अंगठी सोहळा",
            date: "८ फेब्रुवारी २०२७",
            time: "दुपारी १२:००",
            venue: "श्री मंगल कार्यालय",
            note: "अनया आणि रोहन यांच्यातील अंगठ्यांची देवाणघेवाण.",
          },
          {
            title: "स्नेहभोजन",
            date: "८ फेब्रुवारी २०२७",
            time: "दुपारी १:००",
            venue: "श्री मंगल कार्यालय सभागृह",
            note: "नव्या नात्याचा आनंद साजरा करणारे स्नेहभोजन.",
          },
        ],
      },
      gallery: {
        pretitle: "आठवणी",
        title: "फोटो",
        subtitle: "या जागी आपले आवडते फोटो जोडा.",
      },
      rsvp: {
        pretitle: "कृपया कळवा",
        title: "उपस्थिती नोंदवा",
        subtitle: "आपण उपस्थित राहावे ही मनापासून इच्छा आहे. कृपया १ फेब्रुवारी २०२७ पर्यंत कळवा.",
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
      closing: {
        title: "शुभं भवतु",
        note: "या नव्या नात्याला प्रेम आणि आनंदाचे सदैव आशीर्वाद लाभावेत.",
        tagline: "आपल्यासोबत हा आनंद साजरा करण्यास आम्ही उत्सुक आहोत.",
        copyright: "\u00A9 २०२७ \u00B7 प्रेमासह, अनया आणि रोहन",
      },
    },
  },
  housewarming: {
    en: {
      meta: { title: "Deshpande Family | Griha Pravesh" },
      invocation: "Shree Ganeshaya Namah",
      hero: {
        pretitle: "With Great Joy",
        title: "Griha Pravesh",
        subtitle: "The Deshpande family invites you to bless their new home",
        date: "16th January 2027",
        venue: "Flat 402, Sahyadri Residency, Baner, Pune",
        cta: "RSVP Now",
      },
      highlights: {
        pretitle: "The Ceremony",
        title: "Programme",
        events: [
          {
            title: "Vastu Puja",
            date: "16th Jan 2027",
            time: "9:00 AM",
            venue: "Sahyadri Residency, Baner",
            note: "A traditional puja to bless the home and its foundations.",
          },
          {
            title: "Griha Pravesh",
            date: "16th Jan 2027",
            time: "10:30 AM (Muhurat)",
            venue: "Sahyadri Residency, Baner",
            note: "The formal entry into the new home at the auspicious hour.",
          },
          {
            title: "Lunch",
            date: "16th Jan 2027",
            time: "1:00 PM",
            venue: "Sahyadri Residency, Baner",
            note: "A festive lunch to celebrate the new beginning.",
          },
        ],
      },
      gallery: {
        pretitle: "Memories",
        title: "Gallery",
        subtitle: "Replace these placeholders with photos of your new home.",
      },
      rsvp: {
        pretitle: "Kindly Respond",
        title: "RSVP",
        subtitle: "We would be honoured to have you join us. Please respond by 10th January 2027.",
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
      closing: {
        title: "Shubham Bhavatu",
        note: "May this home always be filled with happiness, health and prosperity.",
        tagline: "We can't wait to welcome you home.",
        copyright: "\u00A9 2027 \u00B7 With Love, The Deshpande Family",
      },
    },
    mr: {
      meta: { title: "देशपांडे परिवार | गृहप्रवेश" },
      invocation: "\u0936\u094d\u0930\u0940 \u0917\u0923\u0947\u0936\u093e\u092f \u0928\u092e\u0903",
      hero: {
        pretitle: "अत्यंत आनंदाने",
        title: "गृहप्रवेश",
        subtitle: "देशपांडे परिवार आपणांस नवीन घराच्या आशीर्वादासाठी निमंत्रण देत आहे",
        date: "१६ जानेवारी २०२७",
        venue: "सदनिका ४०२, सह्याद्री रेसिडेन्सी, बाणेर, पुणे",
        cta: "उपस्थिती नोंदवा",
      },
      highlights: {
        pretitle: "सोहळा",
        title: "कार्यक्रम",
        events: [
          {
            title: "वास्तुपूजा",
            date: "१६ जानेवारी २०२७",
            time: "सकाळी ९:००",
            venue: "सह्याद्री रेसिडेन्सी, बाणेर",
            note: "घराच्या पायाभरणीस आशीर्वाद देणारी पारंपरिक पूजा.",
          },
          {
            title: "गृहप्रवेश",
            date: "१६ जानेवारी २०२७",
            time: "सकाळी १०:३० (मुहूर्त)",
            venue: "सह्याद्री रेसिडेन्सी, बाणेर",
            note: "शुभ मुहूर्तावर नवीन घरात औपचारिक प्रवेश.",
          },
          {
            title: "स्नेहभोजन",
            date: "१६ जानेवारी २०२७",
            time: "दुपारी १:००",
            venue: "सह्याद्री रेसिडेन्सी, बाणेर",
            note: "नव्या सुरुवातीचा आनंद साजरा करणारे स्नेहभोजन.",
          },
        ],
      },
      gallery: {
        pretitle: "आठवणी",
        title: "फोटो",
        subtitle: "या जागी आपल्या नव्या घराचे फोटो जोडा.",
      },
      rsvp: {
        pretitle: "कृपया कळवा",
        title: "उपस्थिती नोंदवा",
        subtitle: "आपण उपस्थित राहावे ही मनापासून इच्छा आहे. कृपया १० जानेवारी २०२७ पर्यंत कळवा.",
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
      closing: {
        title: "शुभं भवतु",
        note: "या घरात सदैव सुख, आरोग्य आणि भरभराट नांदो.",
        tagline: "आपले या नव्या घरी मनःपूर्वक स्वागत आहे.",
        copyright: "\u00A9 २०२७ \u00B7 प्रेमासह, देशपांडे परिवार",
      },
    },
  },
  babyshower: {
    en: {
      meta: { title: "Madhura's Dohale Jevan" },
      invocation: "Shree Ganeshaya Namah",
      hero: {
        pretitle: "With Great Joy",
        title: "Madhura's Dohale Jevan",
        subtitle: "Join us to shower Madhura with love as she awaits her little one",
        date: "22nd March 2027",
        venue: "Kulkarni Residence, Deccan, Pune",
        cta: "RSVP Now",
      },
      highlights: {
        pretitle: "The Celebration",
        title: "Programme",
        events: [
          {
            title: "Puja",
            date: "22nd Mar 2027",
            time: "11:00 AM",
            venue: "Kulkarni Residence",
            note: "A small puja to bless mother and baby.",
          },
          {
            title: "Dohale Jevan",
            date: "22nd Mar 2027",
            time: "12:30 PM",
            venue: "Kulkarni Residence",
            note: "The traditional craving feast for the mother-to-be.",
          },
          {
            title: "Games & Blessings",
            date: "22nd Mar 2027",
            time: "2:00 PM",
            venue: "Kulkarni Residence",
            note: "Fun games followed by blessings for the baby.",
          },
        ],
      },
      gallery: {
        pretitle: "Memories",
        title: "Gallery",
        subtitle: "Replace these placeholders with your favourite photos.",
      },
      rsvp: {
        pretitle: "Kindly Respond",
        title: "RSVP",
        subtitle: "We would be honoured to have you join us. Please respond by 15th March 2027.",
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
      closing: {
        title: "Shubham Bhavatu",
        note: "May the little one arrive with health, happiness and countless blessings.",
        tagline: "We can't wait to celebrate with you.",
        copyright: "\u00A9 2027 \u00B7 With Love, The Kulkarni Family",
      },
    },
    mr: {
      meta: { title: "मधुराचे डोहाळे जेवण" },
      invocation: "\u0936\u094d\u0930\u0940 \u0917\u0923\u0947\u0936\u093e\u092f \u0928\u092e\u0903",
      hero: {
        pretitle: "अत्यंत आनंदाने",
        title: "मधुराचे डोहाळे जेवण",
        subtitle: "आपल्या बाळाच्या प्रतीक्षेत असलेल्या मधुरासाठी प्रेमाचा वर्षाव करण्यास सहभागी व्हा",
        date: "२२ मार्च २०२७",
        venue: "कुलकर्णी निवासस्थान, डेक्कन, पुणे",
        cta: "उपस्थिती नोंदवा",
      },
      highlights: {
        pretitle: "उत्सव",
        title: "कार्यक्रम",
        events: [
          {
            title: "पूजा",
            date: "२२ मार्च २०२७",
            time: "सकाळी ११:००",
            venue: "कुलकर्णी निवासस्थान",
            note: "आई आणि बाळाला आशीर्वाद देणारी छोटी पूजा.",
          },
          {
            title: "डोहाळे जेवण",
            date: "२२ मार्च २०२७",
            time: "दुपारी १२:३०",
            venue: "कुलकर्णी निवासस्थान",
            note: "होणाऱ्या आईसाठी पारंपरिक डोहाळे जेवण.",
          },
          {
            title: "खेळ व आशीर्वाद",
            date: "२२ मार्च २०२७",
            time: "दुपारी २:००",
            venue: "कुलकर्णी निवासस्थान",
            note: "मजेदार खेळ आणि त्यानंतर बाळासाठी आशीर्वाद.",
          },
        ],
      },
      gallery: {
        pretitle: "आठवणी",
        title: "फोटो",
        subtitle: "या जागी आपले आवडते फोटो जोडा.",
      },
      rsvp: {
        pretitle: "कृपया कळवा",
        title: "उपस्थिती नोंदवा",
        subtitle: "आपण उपस्थित राहावे ही मनापासून इच्छा आहे. कृपया १५ मार्च २०२७ पर्यंत कळवा.",
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
      closing: {
        title: "शुभं भवतु",
        note: "बाळाचे आगमन आरोग्य, आनंद आणि असंख्य आशीर्वादांसह होवो.",
        tagline: "आपल्यासोबत हा आनंद साजरा करण्यास आम्ही उत्सुक आहोत.",
        copyright: "\u00A9 २०२७ \u00B7 प्रेमासह, कुलकर्णी परिवार",
      },
    },
  },
  anniversary: {
    en: {
      meta: { title: "Joshi Family | 25th Anniversary" },
      invocation: "Shree Ganeshaya Namah",
      hero: {
        pretitle: "Together with their children",
        title: "Mr. & Mrs. Joshi",
        subtitle: "Celebrating 25 wonderful years of togetherness",
        date: "5th December 2026",
        venue: "Shree Mangal Karyalaya, Pune, Maharashtra",
        cta: "RSVP Now",
      },
      highlights: {
        pretitle: "The Celebration",
        title: "Programme",
        events: [
          {
            title: "Puja",
            date: "5th Dec 2026",
            time: "10:00 AM",
            venue: "Shree Mangal Karyalaya",
            note: "A blessing ceremony to mark 25 years of marriage.",
          },
          {
            title: "Vow Renewal",
            date: "5th Dec 2026",
            time: "11:00 AM",
            venue: "Shree Mangal Karyalaya",
            note: "A heartfelt renewal of their wedding vows.",
          },
          {
            title: "Dinner & Dance",
            date: "5th Dec 2026",
            time: "7:00 PM",
            venue: "Shree Mangal Karyalaya Banquet Hall",
            note: "An evening of celebration with family and friends.",
          },
        ],
      },
      gallery: {
        pretitle: "Memories",
        title: "Gallery",
        subtitle: "Replace these placeholders with photos from the last 25 years.",
      },
      rsvp: {
        pretitle: "Kindly Respond",
        title: "RSVP",
        subtitle: "We would be honoured to have you join us. Please respond by 25th November 2026.",
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
      closing: {
        title: "Shubham Bhavatu",
        note: "May their journey together always be blessed with love and happiness.",
        tagline: "We can't wait to celebrate with you.",
        copyright: "\u00A9 2026 \u00B7 With Love, The Joshi Family",
      },
    },
    mr: {
      meta: { title: "जोशी परिवार | २५ वा लग्नवाढदिवस" },
      invocation: "\u0936\u094d\u0930\u0940 \u0917\u0923\u0947\u0936\u093e\u092f \u0928\u092e\u0903",
      hero: {
        pretitle: "मुलांतर्फे",
        title: "श्री. व सौ. जोशी",
        subtitle: "एकत्र आयुष्याच्या २५ सुंदर वर्षांचा उत्सव",
        date: "५ डिसेंबर २०२६",
        venue: "श्री मंगल कार्यालय, पुणे, महाराष्ट्र",
        cta: "उपस्थिती नोंदवा",
      },
      highlights: {
        pretitle: "उत्सव",
        title: "कार्यक्रम",
        events: [
          {
            title: "पूजा",
            date: "५ डिसेंबर २०२६",
            time: "सकाळी १०:००",
            venue: "श्री मंगल कार्यालय",
            note: "२५ वर्षांच्या वैवाहिक जीवनास आशीर्वाद देणारा विधी.",
          },
          {
            title: "प्रतिज्ञा पुनरुच्चार",
            date: "५ डिसेंबर २०२६",
            time: "सकाळी ११:००",
            venue: "श्री मंगल कार्यालय",
            note: "त्यांच्या विवाह प्रतिज्ञांचा मनःपूर्वक पुनरुच्चार.",
          },
          {
            title: "स्नेहभोजन व नृत्य",
            date: "५ डिसेंबर २०२६",
            time: "संध्याकाळी ७:००",
            venue: "श्री मंगल कार्यालय सभागृह",
            note: "कुटुंब आणि मित्रांसह आनंदोत्सवाची संध्याकाळ.",
          },
        ],
      },
      gallery: {
        pretitle: "आठवणी",
        title: "फोटो",
        subtitle: "गेल्या २५ वर्षांतील आपले आवडते फोटो या जागी जोडा.",
      },
      rsvp: {
        pretitle: "कृपया कळवा",
        title: "उपस्थिती नोंदवा",
        subtitle: "आपण उपस्थित राहावे ही मनापासून इच्छा आहे. कृपया २५ नोव्हेंबर २०२६ पर्यंत कळवा.",
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
      closing: {
        title: "शुभं भवतु",
        note: "त्यांच्या सहजीवनास सदैव प्रेम आणि आनंदाचे आशीर्वाद लाभावेत.",
        tagline: "आपल्यासोबत हा आनंद साजरा करण्यास आम्ही उत्सुक आहोत.",
        copyright: "\u00A9 २०२६ \u00B7 प्रेमासह, जोशी परिवार",
      },
    },
  },
  religious: {
    en: {
      meta: { title: "Satyanarayan Puja" },
      invocation: "Shree Ganeshaya Namah",
      hero: {
        pretitle: "With Great Devotion",
        title: "Shree Satyanarayan Puja",
        subtitle: "Join us for a sacred puja and prasad, seeking blessings for our family",
        date: "3rd January 2027",
        venue: "Kulkarni Residence, Deccan, Pune",
        cta: "RSVP Now",
      },
      highlights: {
        pretitle: "The Ceremony",
        title: "Programme",
        events: [
          {
            title: "Puja Preparations",
            date: "3rd Jan 2027",
            time: "9:00 AM",
            venue: "Kulkarni Residence",
            note: "Setting up the mandap and puja essentials.",
          },
          {
            title: "Satyanarayan Puja",
            date: "3rd Jan 2027",
            time: "10:00 AM",
            venue: "Kulkarni Residence",
            note: "The sacred puja performed with family and priest.",
          },
          {
            title: "Prasad & Lunch",
            date: "3rd Jan 2027",
            time: "1:00 PM",
            venue: "Kulkarni Residence",
            note: "Prasad distribution followed by a festive lunch.",
          },
        ],
      },
      gallery: {
        pretitle: "Memories",
        title: "Gallery",
        subtitle: "Replace these placeholders with your favourite photos.",
      },
      rsvp: {
        pretitle: "Kindly Respond",
        title: "RSVP",
        subtitle: "We would be honoured to have you join us. Please respond by 28th December 2026.",
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
      closing: {
        title: "Shubham Bhavatu",
        note: "May Shree Satyanarayan bless our family with health, peace and prosperity.",
        tagline: "We can't wait to celebrate with you.",
        copyright: "\u00A9 2027 \u00B7 With Love, The Kulkarni Family",
      },
    },
    mr: {
      meta: { title: "सत्यनारायण पूजा" },
      invocation: "\u0936\u094d\u0930\u0940 \u0917\u0923\u0947\u0936\u093e\u092f \u0928\u092e\u0903",
      hero: {
        pretitle: "अत्यंत भक्तिभावाने",
        title: "श्री सत्यनारायण पूजा",
        subtitle: "आमच्या कुटुंबासाठी आशीर्वाद मागण्यासाठी पवित्र पूजा व प्रसादासाठी सहभागी व्हा",
        date: "३ जानेवारी २०२७",
        venue: "कुलकर्णी निवासस्थान, डेक्कन, पुणे",
        cta: "उपस्थिती नोंदवा",
      },
      highlights: {
        pretitle: "सोहळा",
        title: "कार्यक्रम",
        events: [
          {
            title: "पूजेची तयारी",
            date: "३ जानेवारी २०२७",
            time: "सकाळी ९:००",
            venue: "कुलकर्णी निवासस्थान",
            note: "मंडप आणि पूजा साहित्याची मांडणी.",
          },
          {
            title: "सत्यनारायण पूजा",
            date: "३ जानेवारी २०२७",
            time: "सकाळी १०:००",
            venue: "कुलकर्णी निवासस्थान",
            note: "कुटुंबीय आणि पुरोहितांसह पवित्र पूजा विधी.",
          },
          {
            title: "प्रसाद व भोजन",
            date: "३ जानेवारी २०२७",
            time: "दुपारी १:००",
            venue: "कुलकर्णी निवासस्थान",
            note: "प्रसाद वाटप आणि त्यानंतर स्नेहभोजन.",
          },
        ],
      },
      gallery: {
        pretitle: "आठवणी",
        title: "फोटो",
        subtitle: "या जागी आपले आवडते फोटो जोडा.",
      },
      rsvp: {
        pretitle: "कृपया कळवा",
        title: "उपस्थिती नोंदवा",
        subtitle: "आपण उपस्थित राहावे ही मनापासून इच्छा आहे. कृपया २८ डिसेंबर २०२६ पर्यंत कळवा.",
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
      closing: {
        title: "शुभं भवतु",
        note: "श्री सत्यनारायणाचे आशीर्वाद आमच्या कुटुंबास सदैव आरोग्य, शांती आणि भरभराट देवोत.",
        tagline: "आपल्यासोबत हा आनंद साजरा करण्यास आम्ही उत्सुक आहोत.",
        copyright: "\u00A9 २०२७ \u00B7 प्रेमासह, कुलकर्णी परिवार",
      },
    },
  },
  celebration: {
    en: {
      meta: { title: "You're Invited to Celebrate" },
      invocation: "Shree Ganeshaya Namah",
      hero: {
        pretitle: "You're Invited",
        title: "A Celebration Awaits",
        subtitle: "Join us for an evening of joy, food, and good company",
        date: "20th February 2027",
        venue: "Kothrud Community Hall, Pune",
        cta: "RSVP Now",
      },
      highlights: {
        pretitle: "The Celebration",
        title: "Programme",
        events: [
          {
            title: "Welcome",
            date: "20th Feb 2027",
            time: "6:00 PM",
            venue: "Kothrud Community Hall",
            note: "Arrive, mingle and enjoy some refreshments.",
          },
          {
            title: "Celebration Programme",
            date: "20th Feb 2027",
            time: "7:00 PM",
            venue: "Kothrud Community Hall",
            note: "The heart of the evening's festivities.",
          },
          {
            title: "Dinner",
            date: "20th Feb 2027",
            time: "8:30 PM",
            venue: "Kothrud Community Hall",
            note: "A festive dinner to close out the celebration.",
          },
        ],
      },
      gallery: {
        pretitle: "Memories",
        title: "Gallery",
        subtitle: "Replace these placeholders with your favourite photos.",
      },
      rsvp: {
        pretitle: "Kindly Respond",
        title: "RSVP",
        subtitle: "We would be honoured to have you join us. Please respond by 10th February 2027.",
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
      closing: {
        title: "Shubham Bhavatu",
        note: "May this celebration be filled with joy, laughter and cherished memories.",
        tagline: "We can't wait to celebrate with you.",
        copyright: "\u00A9 2027 \u00B7 With Love",
      },
    },
    mr: {
      meta: { title: "आपणांस सोहळ्याचे निमंत्रण" },
      invocation: "\u0936\u094d\u0930\u0940 \u0917\u0923\u0947\u0936\u093e\u092f \u0928\u092e\u0903",
      hero: {
        pretitle: "आपणांस निमंत्रण",
        title: "एक खास सोहळा",
        subtitle: "आनंद, स्नेहभोजन आणि सुंदर सहवासाच्या संध्याकाळसाठी सहभागी व्हा",
        date: "२० फेब्रुवारी २०२७",
        venue: "कोथरूड सामुदायिक सभागृह, पुणे",
        cta: "उपस्थिती नोंदवा",
      },
      highlights: {
        pretitle: "उत्सव",
        title: "कार्यक्रम",
        events: [
          {
            title: "स्वागत",
            date: "२० फेब्रुवारी २०२७",
            time: "संध्याकाळी ६:००",
            venue: "कोथरूड सामुदायिक सभागृह",
            note: "या आणि आमच्यासोबत थोडा वेळ घालवा.",
          },
          {
            title: "सोहळा कार्यक्रम",
            date: "२० फेब्रुवारी २०२७",
            time: "संध्याकाळी ७:००",
            venue: "कोथरूड सामुदायिक सभागृह",
            note: "संध्याकाळच्या उत्सवाचा मुख्य भाग.",
          },
          {
            title: "स्नेहभोजन",
            date: "२० फेब्रुवारी २०२७",
            time: "रात्री ८:३०",
            venue: "कोथरूड सामुदायिक सभागृह",
            note: "सोहळ्याचा समारोप करणारे स्नेहभोजन.",
          },
        ],
      },
      gallery: {
        pretitle: "आठवणी",
        title: "फोटो",
        subtitle: "या जागी आपले आवडते फोटो जोडा.",
      },
      rsvp: {
        pretitle: "कृपया कळवा",
        title: "उपस्थिती नोंदवा",
        subtitle: "आपण उपस्थित राहावे ही मनापासून इच्छा आहे. कृपया १० फेब्रुवारी २०२७ पर्यंत कळवा.",
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
      closing: {
        title: "शुभं भवतु",
        note: "या सोहळ्यात आनंद, हास्य आणि सुंदर आठवणी भरून राहोत.",
        tagline: "आपल्यासोबत हा आनंद साजरा करण्यास आम्ही उत्सुक आहोत.",
        copyright: "\u00A9 २०२७ \u00B7 प्रेमासह",
      },
    },
  },
};
