// src/pages/Profile.jsx - Simplified Profile Setup Form
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Country options for the dropdown
const countryOptions = [
  { value: 'AF', label: 'Afghanistan' },
  { value: 'AL', label: 'Albania' },
  { value: 'DZ', label: 'Algeria' },
  { value: 'AS', label: 'American Samoa' },
  { value: 'AD', label: 'Andorra' },
  { value: 'AO', label: 'Angola' },
  { value: 'AI', label: 'Anguilla' },
  { value: 'AQ', label: 'Antarctica' },
  { value: 'AG', label: 'Antigua and Barbuda' },
  { value: 'AR', label: 'Argentina' },
  { value: 'AM', label: 'Armenia' },
  { value: 'AW', label: 'Aruba' },
  { value: 'AU', label: 'Australia' },
  { value: 'AT', label: 'Austria' },
  { value: 'AZ', label: 'Azerbaijan' },
  { value: 'BS', label: 'Bahamas' },
  { value: 'BH', label: 'Bahrain' },
  { value: 'BD', label: 'Bangladesh' },
  { value: 'BB', label: 'Barbados' },
  { value: 'BY', label: 'Belarus' },
  { value: 'BE', label: 'Belgium' },
  { value: 'BZ', label: 'Belize' },
  { value: 'BJ', label: 'Benin' },
  { value: 'BM', label: 'Bermuda' },
  { value: 'BT', label: 'Bhutan' },
  { value: 'BO', label: 'Bolivia' },
  { value: 'BA', label: 'Bosnia and Herzegovina' },
  { value: 'BW', label: 'Botswana' },
  { value: 'BV', label: 'Bouvet Island' },
  { value: 'BR', label: 'Brazil' },
  { value: 'IO', label: 'British Indian Ocean Territory' },
  { value: 'BN', label: 'Brunei Darussalam' },
  { value: 'BG', label: 'Bulgaria' },
  { value: 'BF', label: 'Burkina Faso' },
  { value: 'BI', label: 'Burundi' },
  { value: 'KH', label: 'Cambodia' },
  { value: 'CM', label: 'Cameroon' },
  { value: 'CA', label: 'Canada' },
  { value: 'CV', label: 'Cape Verde' },
  { value: 'KY', label: 'Cayman Islands' },
  { value: 'CF', label: 'Central African Republic' },
  { value: 'TD', label: 'Chad' },
  { value: 'CL', label: 'Chile' },
  { value: 'CN', label: 'China' },
  { value: 'CX', label: 'Christmas Island' },
  { value: 'CC', label: 'Cocos (Keeling) Islands' },
  { value: 'CO', label: 'Colombia' },
  { value: 'KM', label: 'Comoros' },
  { value: 'CG', label: 'Congo' },
  { value: 'CD', label: 'Congo, The Democratic Republic of the' },
  { value: 'CK', label: 'Cook Islands' },
  { value: 'CR', label: 'Costa Rica' },
  { value: 'CI', label: 'Cote D\'Ivoire' },
  { value: 'HR', label: 'Croatia' },
  { value: 'CU', label: 'Cuba' },
  { value: 'CY', label: 'Cyprus' },
  { value: 'CZ', label: 'Czech Republic' },
  { value: 'DK', label: 'Denmark' },
  { value: 'DJ', label: 'Djibouti' },
  { value: 'DM', label: 'Dominica' },
  { value: 'DO', label: 'Dominican Republic' },
  { value: 'EC', label: 'Ecuador' },
  { value: 'EG', label: 'Egypt' },
  { value: 'SV', label: 'El Salvador' },
  { value: 'GQ', label: 'Equatorial Guinea' },
  { value: 'ER', label: 'Eritrea' },
  { value: 'EE', label: 'Estonia' },
  { value: 'ET', label: 'Ethiopia' },
  { value: 'FK', label: 'Falkland Islands (Malvinas)' },
  { value: 'FO', label: 'Faroe Islands' },
  { value: 'FJ', label: 'Fiji' },
  { value: 'FI', label: 'Finland' },
  { value: 'FR', label: 'France' },
  { value: 'GF', label: 'French Guiana' },
  { value: 'PF', label: 'French Polynesia' },
  { value: 'TF', label: 'French Southern Territories' },
  { value: 'GA', label: 'Gabon' },
  { value: 'GM', label: 'Gambia' },
  { value: 'GE', label: 'Georgia' },
  { value: 'DE', label: 'Germany' },
  { value: 'GH', label: 'Ghana' },
  { value: 'GI', label: 'Gibraltar' },
  { value: 'GR', label: 'Greece' },
  { value: 'GL', label: 'Greenland' },
  { value: 'GD', label: 'Grenada' },
  { value: 'GP', label: 'Guadeloupe' },
  { value: 'GU', label: 'Guam' },
  { value: 'GT', label: 'Guatemala' },
  { value: 'GG', label: 'Guernsey' },
  { value: 'GN', label: 'Guinea' },
  { value: 'GW', label: 'Guinea-Bissau' },
  { value: 'GY', label: 'Guyana' },
  { value: 'HT', label: 'Haiti' },
  { value: 'HM', label: 'Heard Island and Mcdonald Islands' },
  { value: 'VA', label: 'Holy See (Vatican City State)' },
  { value: 'HN', label: 'Honduras' },
  { value: 'HK', label: 'Hong Kong' },
  { value: 'HU', label: 'Hungary' },
  { value: 'IS', label: 'Iceland' },
  { value: 'IN', label: 'India' },
  { value: 'ID', label: 'Indonesia' },
  { value: 'IR', label: 'Iran, Islamic Republic Of' },
  { value: 'IQ', label: 'Iraq' },
  { value: 'IE', label: 'Ireland' },
  { value: 'IM', label: 'Isle of Man' },
  { value: 'IL', label: 'Israel' },
  { value: 'IT', label: 'Italy' },
  { value: 'JM', label: 'Jamaica' },
  { value: 'JP', label: 'Japan' },
  { value: 'JE', label: 'Jersey' },
  { value: 'JO', label: 'Jordan' },
  { value: 'KZ', label: 'Kazakhstan' },
  { value: 'KE', label: 'Kenya' },
  { value: 'KI', label: 'Kiribati' },
  { value: 'KP', label: 'Korea, Democratic People\'S Republic of' },
  { value: 'KR', label: 'Korea, Republic of' },
  { value: 'KW', label: 'Kuwait' },
  { value: 'KG', label: 'Kyrgyzstan' },
  { value: 'LA', label: 'Lao People\'S Democratic Republic' },
  { value: 'LV', label: 'Latvia' },
  { value: 'LB', label: 'Lebanon' },
  { value: 'LS', label: 'Lesotho' },
  { value: 'LR', label: 'Liberia' },
  { value: 'LY', label: 'Libyan Arab Jamahiriya' },
  { value: 'LI', label: 'Liechtenstein' },
  { value: 'LT', label: 'Lithuania' },
  { value: 'LU', label: 'Luxembourg' },
  { value: 'MO', label: 'Macao' },
  { value: 'MK', label: 'Macedonia, The Former Yugoslav Republic of' },
  { value: 'MG', label: 'Madagascar' },
  { value: 'MW', label: 'Malawi' },
  { value: 'MY', label: 'Malaysia' },
  { value: 'MV', label: 'Maldives' },
  { value: 'ML', label: 'Mali' },
  { value: 'MT', label: 'Malta' },
  { value: 'MH', label: 'Marshall Islands' },
  { value: 'MQ', label: 'Martinique' },
  { value: 'MR', label: 'Mauritania' },
  { value: 'MU', label: 'Mauritius' },
  { value: 'YT', label: 'Mayotte' },
  { value: 'MX', label: 'Mexico' },
  { value: 'FM', label: 'Micronesia, Federated States of' },
  { value: 'MD', label: 'Moldova, Republic of' },
  { value: 'MC', label: 'Monaco' },
  { value: 'MN', label: 'Mongolia' },
  { value: 'ME', label: 'Montenegro' },
  { value: 'MS', label: 'Montserrat' },
  { value: 'MA', label: 'Morocco' },
  { value: 'MZ', label: 'Mozambique' },
  { value: 'MM', label: 'Myanmar' },
  { value: 'NA', label: 'Namibia' },
  { value: 'NR', label: 'Nauru' },
  { value: 'NP', label: 'Nepal' },
  { value: 'NL', label: 'Netherlands' },
  { value: 'AN', label: 'Netherlands Antilles' },
  { value: 'NC', label: 'New Caledonia' },
  { value: 'NZ', label: 'New Zealand' },
  { value: 'NI', label: 'Nicaragua' },
  { value: 'NE', label: 'Niger' },
  { value: 'NG', label: 'Nigeria' },
  { value: 'NU', label: 'Niue' },
  { value: 'NF', label: 'Norfolk Island' },
  { value: 'MP', label: 'Northern Mariana Islands' },
  { value: 'NO', label: 'Norway' },
  { value: 'OM', label: 'Oman' },
  { value: 'PK', label: 'Pakistan' },
  { value: 'PW', label: 'Palau' },
  { value: 'PS', label: 'Palestinian Territory, Occupied' },
  { value: 'PA', label: 'Panama' },
  { value: 'PG', label: 'Papua New Guinea' },
  { value: 'PY', label: 'Paraguay' },
  { value: 'PE', label: 'Peru' },
  { value: 'PH', label: 'Philippines' },
  { value: 'PN', label: 'Pitcairn' },
  { value: 'PL', label: 'Poland' },
  { value: 'PT', label: 'Portugal' },
  { value: 'PR', label: 'Puerto Rico' },
  { value: 'QA', label: 'Qatar' },
  { value: 'RE', label: 'Reunion' },
  { value: 'RO', label: 'Romania' },
  { value: 'RU', label: 'Russian Federation' },
  { value: 'RW', label: 'Rwanda' },
  { value: 'SH', label: 'Saint Helena' },
  { value: 'KN', label: 'Saint Kitts and Nevis' },
  { value: 'LC', label: 'Saint Lucia' },
  { value: 'PM', label: 'Saint Pierre and Miquelon' },
  { value: 'VC', label: 'Saint Vincent and the Grenadines' },
  { value: 'WS', label: 'Samoa' },
  { value: 'SM', label: 'San Marino' },
  { value: 'ST', label: 'Sao Tome and Principe' },
  { value: 'SA', label: 'Saudi Arabia' },
  { value: 'SN', label: 'Senegal' },
  { value: 'RS', label: 'Serbia' },
  { value: 'SC', label: 'Seychelles' },
  { value: 'SL', label: 'Sierra Leone' },
  { value: 'SG', label: 'Singapore' },
  { value: 'SK', label: 'Slovakia' },
  { value: 'SI', label: 'Slovenia' },
  { value: 'SB', label: 'Solomon Islands' },
  { value: 'SO', label: 'Somalia' },
  { value: 'ZA', label: 'South Africa' },
  { value: 'GS', label: 'South Georgia and the South Sandwich Islands' },
  { value: 'ES', label: 'Spain' },
  { value: 'LK', label: 'Sri Lanka' },
  { value: 'SD', label: 'Sudan' },
  { value: 'SR', label: 'Suriname' },
  { value: 'SJ', label: 'Svalbard and Jan Mayen' },
  { value: 'SZ', label: 'Swaziland' },
  { value: 'SE', label: 'Sweden' },
  { value: 'CH', label: 'Switzerland' },
  { value: 'SY', label: 'Syrian Arab Republic' },
  { value: 'TW', label: 'Taiwan, Province of China' },
  { value: 'TJ', label: 'Tajikistan' },
  { value: 'TZ', label: 'Tanzania, United Republic of' },
  { value: 'TH', label: 'Thailand' },
  { value: 'TL', label: 'Timor-Leste' },
  { value: 'TG', label: 'Togo' },
  { value: 'TK', label: 'Tokelau' },
  { value: 'TO', label: 'Tonga' },
  { value: 'TT', label: 'Trinidad and Tobago' },
  { value: 'TN', label: 'Tunisia' },
  { value: 'TR', label: 'Turkey' },
  { value: 'TM', label: 'Turkmenistan' },
  { value: 'TC', label: 'Turks and Caicos Islands' },
  { value: 'TV', label: 'Tuvalu' },
  { value: 'UG', label: 'Uganda' },
  { value: 'UA', label: 'Ukraine' },
  { value: 'AE', label: 'United Arab Emirates' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'US', label: 'United States' },
  { value: 'UM', label: 'United States Minor Outlying Islands' },
  { value: 'UY', label: 'Uruguay' },
  { value: 'UZ', label: 'Uzbekistan' },
  { value: 'VU', label: 'Vanuatu' },
  { value: 'VE', label: 'Venezuela' },
  { value: 'VN', label: 'Viet Nam' },
  { value: 'VG', label: 'Virgin Islands, British' },
  { value: 'VI', label: 'Virgin Islands, U.S.' },
  { value: 'WF', label: 'Wallis and Futuna' },
  { value: 'EH', label: 'Western Sahara' },
  { value: 'YE', label: 'Yemen' },
  { value: 'ZM', label: 'Zambia' },
  { value: 'ZW', label: 'Zimbabwe' }
];

export default function Profile() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    birthMonth: '',
    birthDay: '',
    birthYear: '',
    age: '',
    gender: '',
    country: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Calculate age when date of birth changes
  useEffect(() => {
    if (formData.birthMonth && formData.birthDay && formData.birthYear) {
      const birthDate = new Date(formData.birthYear, formData.birthMonth - 1, formData.birthDay);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      setFormData(prev => ({ ...prev, age: age.toString() }));
    }
  }, [formData.birthMonth, formData.birthDay, formData.birthYear]);

  // Handle form submission (dummy - no Firebase saving)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate all required fields
    if (!formData.name.trim()) {
      setError('Please enter your name.');
      return;
    }
    
    if (!formData.birthMonth || !formData.birthDay || !formData.birthYear) {
      setError('Please select your complete date of birth.');
      return;
    }
    
    if (!formData.gender) {
      setError('Please select your gender.');
      return;
    }
    
    if (!formData.country) {
      setError('Please select your country of residence.');
      return;
    }
    
    setLoading(true);
    
    // Simulate saving (dummy delay)
    setTimeout(() => {
      console.log('Profile data (not saved):', formData);
      setLoading(false);
      // Redirect to dashboard
      navigate('/dashboard');
    }, 1000);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  // Generate arrays for date selection
  const months = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  const days = Array.from({ length: 31 }, (_, i) => ({ value: (i + 1).toString(), label: (i + 1).toString() }));
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => {
    const year = currentYear - i;
    return { value: year.toString(), label: year.toString() };
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-olive/20">
      {/* Header */}
      <div className="bg-brand text-softyellow p-4">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">Complete Your Guide Profile</h1>
          <button 
            onClick={handleLogout}
            className="bg-softyellow text-brand px-4 py-2 rounded hover:bg-softyellow/90 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Profile Form */}
      <div className="max-w-2xl mx-auto p-6">
        <motion.div
          className="bg-sand rounded-2xl shadow-xl p-8 border-2 border-softyellow/20"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-brand mb-2">Set Up Your Profile</h2>
            <p className="text-brand/70">Tell us about yourself to become a verified guide</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-brand mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-olive/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-softyellow focus:border-softyellow bg-white text-brand placeholder-brand/50"
                required
                disabled={loading}
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-brand mb-2">
                Date of Birth *
              </label>
              <div className="grid grid-cols-3 gap-4">
                {/* Month */}
                <div>
                  <label className="block text-xs text-brand/60 mb-1">Month</label>
                  <select
                    value={formData.birthMonth}
                    onChange={(e) => setFormData(prev => ({ ...prev, birthMonth: e.target.value }))}
                    className="w-full px-3 py-3 border border-olive/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-softyellow focus:border-softyellow bg-white text-brand"
                    required
                    disabled={loading}
                  >
                    <option value="">Month</option>
                    {months.map(month => (
                      <option key={month.value} value={month.value}>{month.label}</option>
                    ))}
                  </select>
                </div>

                {/* Day */}
                <div>
                  <label className="block text-xs text-brand/60 mb-1">Day</label>
                  <select
                    value={formData.birthDay}
                    onChange={(e) => setFormData(prev => ({ ...prev, birthDay: e.target.value }))}
                    className="w-full px-3 py-3 border border-olive/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-softyellow focus:border-softyellow bg-white text-brand"
                    required
                    disabled={loading}
                  >
                    <option value="">Day</option>
                    {days.map(day => (
                      <option key={day.value} value={day.value}>{day.label}</option>
                    ))}
                  </select>
                </div>

                {/* Year */}
                <div>
                  <label className="block text-xs text-brand/60 mb-1">Year</label>
                  <select
                    value={formData.birthYear}
                    onChange={(e) => setFormData(prev => ({ ...prev, birthYear: e.target.value }))}
                    className="w-full px-3 py-3 border border-olive/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-softyellow focus:border-softyellow bg-white text-brand"
                    required
                    disabled={loading}
                  >
                    <option value="">Year</option>
                    {years.map(year => (
                      <option key={year.value} value={year.value}>{year.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Age Field (Auto-calculated) */}
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-brand mb-2">
                Age
              </label>
              <input
                type="text"
                id="age"
                value={formData.age}
                placeholder="Age will be calculated automatically"
                className="w-full px-4 py-3 border border-olive/30 rounded-lg bg-gray-100 text-brand/70 cursor-not-allowed"
                readOnly
                disabled
              />
            </div>

            {/* Gender Toggle Buttons */}
            <div>
              <label className="block text-sm font-medium text-brand mb-2">
                Gender *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {['Female', 'Male', 'Other', 'Rather not say'].map((genderOption) => (
                  <button
                    key={genderOption}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, gender: genderOption.toLowerCase().replace(' ', '_') }))}
                    className={`py-3 px-4 rounded-lg border-2 transition-all font-medium ${
                      formData.gender === genderOption.toLowerCase().replace(' ', '_')
                        ? 'bg-softyellow border-softyellow text-brand shadow-md'
                        : 'bg-white border-olive/30 text-brand hover:border-softyellow/50 hover:bg-softyellow/10'
                    }`}
                    disabled={loading}
                  >
                    {genderOption}
                  </button>
                ))}
              </div>
            </div>

            {/* Country of Residence */}
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-brand mb-2">
                Country of Residence *
              </label>
              <select
                id="country"
                value={formData.country}
                onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                className="w-full px-4 py-3 border border-olive/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-softyellow focus:border-softyellow bg-white text-brand"
                required
                disabled={loading}
              >
                <option value="">Select your country</option>
                {countryOptions.map(country => (
                  <option key={country.value} value={country.value}>{country.label}</option>
                ))}
              </select>
            </div>

            {/* Save Button */}
            <motion.button
              type="submit"
              className="w-full bg-brand text-softyellow py-4 rounded-lg text-lg font-semibold hover:bg-brand/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              disabled={loading}
            >
              {loading ? "Saving Profile..." : "Save and Continue to Dashboard"}
            </motion.button>
          </form>

          {/* Back to Home Link */}
          <div className="mt-6 text-center">
            <button 
              onClick={() => navigate("/")}
              className="text-sm text-brand/60 hover:text-brand hover:underline transition"
              disabled={loading}
            >
              ← Back to Home
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}