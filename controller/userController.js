
const { GoogleAuth } = require('google-auth-library');
const keyFileJson = require('../controller/serviceAccount.json');

const getData = async (req, res) => {
    try {
        const auth = new GoogleAuth({
            credentials: keyFileJson,
            scopes: ['https://www.googleapis.com/auth/analytics'],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();
        console.log('Access Token:', accessToken.token);
        

        const fetchData = async () => {
            const apiUrl = 'https://analyticsdata.googleapis.com/v1beta/properties/324762467:runReport';
          
             const apiKey = accessToken.token;  
      
            const requestBody = {"dimensions":[{"name":"pageTitle"},{"name":"fullPageUrl"},{"name":"pagePath"}],"metrics":[{"name":"active28DayUsers"},{"name":"eventCount"},{"name":"eventValue"},{"name":"screenPageViews"}],"dateRanges":[{"startDate":"30daysAgo","endDate":"yesterday"}]};
      
            try {
              const response = await fetch(apiUrl, {
                
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${apiKey}`,  
                },
                body: JSON.stringify(requestBody),
              });
            //   console.log('response: ', response)
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
      
              const data = await response.json();
              console.log('API response:', JSON.stringify(data.rows));

              return res.status(200).json(data)
             
      
            } catch (error) {
              console.error('Error fetching data:', error);
              
            }
          };
      
          fetchData();
       
    } catch (error) {
        console.error('Error:', error.message); 
        res.status(500).json({ error: 'Internal Server Error' });
    }
};







module.exports = {
    
    getData
}