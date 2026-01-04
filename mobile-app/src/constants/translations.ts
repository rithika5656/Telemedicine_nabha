/**
 * Translations for Tamil, Hindi, English
 * Simple key-value structure
 */

export type Language = 'en' | 'ta' | 'hi';

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Language selection
    selectLanguage: 'Select Language',
    english: 'English',
    tamil: 'தமிழ்',
    hindi: 'हिन्दी',
    
    // Home
    welcome: 'Welcome',
    lastConsultation: 'Last Consultation',
    addSymptoms: 'Add Symptoms',
    viewRecords: 'View Records',
    upcomingCall: 'Upcoming Call',
    medicineInfo: 'Medicine Info',
    
    // Symptoms
    selectSymptoms: 'Select Symptoms',
    fever: 'Fever',
    cough: 'Cough',
    headache: 'Headache',
    bodyPain: 'Body Pain',
    cold: 'Cold',
    stomach: 'Stomach Pain',
    vomiting: 'Vomiting',
    diarrhea: 'Diarrhea',
    breathing: 'Breathing Problem',
    other: 'Other',
    additionalNotes: 'Additional Notes',
    addPhoto: 'Add Photo',
    addVoice: 'Add Voice Note',
    submit: 'Submit',
    saved: 'Saved',
    willSync: 'Will sync when network available',
    
    // Records
    myRecords: 'My Records',
    doctorNotes: 'Doctor Notes',
    prescription: 'Prescription',
    noRecords: 'No records yet',
    
    // Consultation
    scheduledCall: 'Scheduled Call',
    callTime: 'Call Time',
    callType: 'Call Type',
    videoCall: 'Video Call',
    audioCall: 'Audio Call',
    joinCall: 'Join Call',
    noUpcoming: 'No upcoming consultation',
    onlineRequired: 'Internet required to join call',
    
    // Medicine
    medicines: 'Medicines',
    nearestPharmacy: 'Nearest Pharmacy',
    lastUpdated: 'Last Updated',
    available: 'Available',
    notAvailable: 'Not Available',
    
    // Status messages
    offline: 'Offline',
    online: 'Online',
    networkUnavailable: 'Network unavailable',
    dataSaved: 'Data saved safely',
    tryLater: 'Please try later',
    syncing: 'Syncing...',
    syncComplete: 'Sync complete',
  },
  
  ta: {
    // Language selection
    selectLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்',
    english: 'English',
    tamil: 'தமிழ்',
    hindi: 'हिन्दी',
    
    // Home
    welcome: 'வரவேற்பு',
    lastConsultation: 'கடந்த ஆலோசனை',
    addSymptoms: 'அறிகுறிகளை சேர்க்கவும்',
    viewRecords: 'பதிவுகளைப் பார்க்க',
    upcomingCall: 'வரவிருக்கும் அழைப்பு',
    medicineInfo: 'மருந்து தகவல்',
    
    // Symptoms
    selectSymptoms: 'அறிகுறிகளைத் தேர்ந்தெடுக்கவும்',
    fever: 'காய்ச்சல்',
    cough: 'இருமல்',
    headache: 'தலைவலி',
    bodyPain: 'உடல் வலி',
    cold: 'சளி',
    stomach: 'வயிற்று வலி',
    vomiting: 'வாந்தி',
    diarrhea: 'வயிற்றுப்போக்கு',
    breathing: 'சுவாசப் பிரச்சனை',
    other: 'மற்றவை',
    additionalNotes: 'கூடுதல் குறிப்புகள்',
    addPhoto: 'புகைப்படம் சேர்க்கவும்',
    addVoice: 'குரல் குறிப்பு சேர்க்கவும்',
    submit: 'சமர்ப்பிக்கவும்',
    saved: 'சேமிக்கப்பட்டது',
    willSync: 'நெட்வொர்க் கிடைக்கும்போது ஒத்திசைக்கும்',
    
    // Records
    myRecords: 'என் பதிவுகள்',
    doctorNotes: 'மருத்துவர் குறிப்புகள்',
    prescription: 'மருந்து சீட்டு',
    noRecords: 'இன்னும் பதிவுகள் இல்லை',
    
    // Consultation
    scheduledCall: 'திட்டமிட்ட அழைப்பு',
    callTime: 'அழைப்பு நேரம்',
    callType: 'அழைப்பு வகை',
    videoCall: 'வீடியோ அழைப்பு',
    audioCall: 'ஆடியோ அழைப்பு',
    joinCall: 'அழைப்பில் சேரவும்',
    noUpcoming: 'வரவிருக்கும் ஆலோசனை இல்லை',
    onlineRequired: 'அழைப்பில் சேர இணையம் தேவை',
    
    // Medicine
    medicines: 'மருந்துகள்',
    nearestPharmacy: 'அருகிலுள்ள மருந்தகம்',
    lastUpdated: 'கடைசியாக புதுப்பிக்கப்பட்டது',
    available: 'கிடைக்கும்',
    notAvailable: 'கிடைக்காது',
    
    // Status messages
    offline: 'ஆஃப்லைன்',
    online: 'ஆன்லைன்',
    networkUnavailable: 'நெட்வொர்க் இல்லை',
    dataSaved: 'தரவு பாதுகாப்பாக சேமிக்கப்பட்டது',
    tryLater: 'பின்னர் முயற்சிக்கவும்',
    syncing: 'ஒத்திசைக்கிறது...',
    syncComplete: 'ஒத்திசைவு முடிந்தது',
  },
  
  hi: {
    // Language selection
    selectLanguage: 'भाषा चुनें',
    english: 'English',
    tamil: 'தமிழ்',
    hindi: 'हिन्दी',
    
    // Home
    welcome: 'स्वागत',
    lastConsultation: 'पिछला परामर्श',
    addSymptoms: 'लक्षण जोड़ें',
    viewRecords: 'रिकॉर्ड देखें',
    upcomingCall: 'आगामी कॉल',
    medicineInfo: 'दवा जानकारी',
    
    // Symptoms
    selectSymptoms: 'लक्षण चुनें',
    fever: 'बुखार',
    cough: 'खांसी',
    headache: 'सिरदर्द',
    bodyPain: 'शरीर दर्द',
    cold: 'सर्दी',
    stomach: 'पेट दर्द',
    vomiting: 'उल्टी',
    diarrhea: 'दस्त',
    breathing: 'सांस की समस्या',
    other: 'अन्य',
    additionalNotes: 'अतिरिक्त नोट्स',
    addPhoto: 'फोटो जोड़ें',
    addVoice: 'वॉइस नोट जोड़ें',
    submit: 'जमा करें',
    saved: 'सहेजा गया',
    willSync: 'नेटवर्क उपलब्ध होने पर सिंक होगा',
    
    // Records
    myRecords: 'मेरे रिकॉर्ड',
    doctorNotes: 'डॉक्टर नोट्स',
    prescription: 'पर्ची',
    noRecords: 'अभी तक कोई रिकॉर्ड नहीं',
    
    // Consultation
    scheduledCall: 'निर्धारित कॉल',
    callTime: 'कॉल समय',
    callType: 'कॉल प्रकार',
    videoCall: 'वीडियो कॉल',
    audioCall: 'ऑडियो कॉल',
    joinCall: 'कॉल में शामिल हों',
    noUpcoming: 'कोई आगामी परामर्श नहीं',
    onlineRequired: 'कॉल में शामिल होने के लिए इंटरनेट आवश्यक',
    
    // Medicine
    medicines: 'दवाइयां',
    nearestPharmacy: 'निकटतम फार्मेसी',
    lastUpdated: 'अंतिम अपडेट',
    available: 'उपलब्ध',
    notAvailable: 'उपलब्ध नहीं',
    
    // Status messages
    offline: 'ऑफलाइन',
    online: 'ऑनलाइन',
    networkUnavailable: 'नेटवर्क उपलब्ध नहीं',
    dataSaved: 'डेटा सुरक्षित रूप से सहेजा गया',
    tryLater: 'बाद में पुनः प्रयास करें',
    syncing: 'सिंक हो रहा है...',
    syncComplete: 'सिंक पूर्ण',
  },
};
