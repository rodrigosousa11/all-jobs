const axios = require('axios');

// Define the options for the HTTP request
var requestOptions = {
	method: 'GET',
	redirect: 'follow'
};

// Declare variables to hold the data from the API and the search results
let data;
let results;

// Function to search in the data returned from the API
function searchInData(searchString) {
	// Filter the data array, checking if any value in each item includes the search string
	return data.filter(item => 
		Object.values(item).some(val => 
			val.toString().toLowerCase().includes(searchString.toLowerCase())
		)
	);
}

// Function to fetch data from the Arbeitnow job board API and search in it
function searchInArbeitnow(searchString) {
	/**
	 * Searches for a specific string in the Arbeitnow job board API.
	 * @param {string} searchString - The string to search for.
	 * @returns {Promise<Array>} - A promise that resolves to an array of search results.
	 */
	// Fetch data from the API
	return axios("https://www.arbeitnow.com/api/job-board-api", requestOptions)
	.then(response => {
		data = response.data.data;
		results = searchInData(searchString);
		return results;
	})
	.catch(error => console.log('error', error));
}

// Call the searchInArbeitnow function with 'Marketing' as the search string and log the results
searchInArbeitnow('Marketing').then(console.log);





/* 
Exemplo de resposta do fetch: 

{
	"data": [
		{
			"slug": "mulesoft-developer-ateeca-178727",
			"company_name": "ateeca",
			"title": "Mulesoft Developer",
			"description": "<p>Key Requirement:<br />o Hands-on experience on Building interfaces on any ESB platform.<br />o Experience in Core Java, Messaging (JMS), Web API: SOAP, REST and authentication<br />methods such as OAuth and SAML<br />o Mulesoft integration developers are also responsible for managing the any point<br />Cloud Hub environment and supporting existing customer implementations.<br />o Work on enhancements and bug fixes to existing Mulesoft applications.<br />o Hands-on experience with open source and agile development tools such as GitHub<br />or SVN, and Maven<br />o Utilize an Agile / Scrum methodology to manage development work.<br />o Experience of working with Mulesoft components, workflow, and patterns, and how<br />to configure them<br />o Proficiency in designing Mule components (Mule ESB v3.0 and above, any point<br />Studio, flows, MEL, message modelling, pub-sub, routing, filtering, database,<br />exception handling, and API Management)<br />o Knowledge of message sources, processors and properties.<br />o Good knowledge of any point Connectors for business applications, Java and Groovy<br />(components and transformers), flow and Java debug<br />o Understand exception handling and unit testing like M Units with Mule ESB<br />o Experience with creation of web services and integrate them in workflow with<br />different ESB Platform.<br />o Understanding of and ability to invoke web services - REST (with RAML or JSON /<br />XML SOAP with WSDL)<br />o Ability to debug using tools like SoapUI, Postman<br />o Experience designing Mule ESB templates<br />o Knowledge of other API management tools like apigee and WSO2 will be added<br />advantage.</p><p>Skills:<br />o MuleSoft, EAI Solutions.<br />o Understanding of and ability to push or consume message from queue/topic.<br />o Excellent verbal and written communications skills as well as a winning team attitude<br />and strong people skills.<br /> </p><p>All your information will be kept confidential according to EEO guidelines.</p>",
			"remote": false,
			"url": "https://arbeitnow.com/view/mulesoft-developer-ateeca-178727",
			"tags": [
				"Information technology and services",
				"information technology"
			],
			"job_types": [
				"Mid-senior",
				"contract"
			],
			"location": "Leicester",
			"created_at": 1638006745
		},
		{
			"slug": "murex-developer-ateeca-53841",
			"company_name": "ateeca",
			"title": "Murex Developer",
			"description": "<p>Hands on experience in Murex Development</p><p>Proficient understanding on MXML &amp; Murex Datamart</p><p>Must have good communication skills</p><p>Good to have experience in Investment Banking or Capital Market Domain</p><p>All your information will be kept confidential according to EEO guidelines.</p>",
			"remote": false,
			"url": "https://arbeitnow.com/view/murex-developer-ateeca-53841",
			"tags": [
				"Information technology and services",
				"information technology"
			],
			"job_types": [
				"Mid-senior",
				"contract"
			],
			"location": "London",
			"created_at": 1638006745
		},
		{
			"slug": "assistente-alla-clientela-kiabi-italia-300858",
			"company_name": "Kiabi Italia",
			"title": "ASSISTENTE ALLA CLIENTELA",
			"description": "<p>Kiabi, azienda francese leader nella grande distribuzione tessile a piccoli prezzi e presente in Europa con più di 500 punti vendita e più di 9000 collaboratori, cerca per il proprio negozio di OLGIATE OLONA:</p><p> </p><p>ASSISTENTE ALLA CLIENTELA: assistenza al cliente, cassa e salottini prova, posizionamento e valorizzazione del prodotto.</p><p> </p><p>Studenti e studentesse appassionati di moda e con spirito commerciale, dinamici, sorridenti e orientati al lavoro di squadra. Richiediamo disponibilità a lavorare il sabato e la domenica su turni.</p><p>Preferibilmente con una prima esperienza nella vendita.</p><p>Kiabi offre:</p><p>- Un inserimento e un percorso di formazione</p><p>- Un ambiente di lavoro giovane e stimolante</p><p> Sede di lavoro: OLGIATE OLONA</p><p>Tipo di contratto: part-time CTD SOSTITUZIONE MALATTIA.</p><p> </p>",
			"remote": false,
			"url": "https://arbeitnow.com/view/assistente-alla-clientela-kiabi-italia-300858",
			"tags": [
				"Apparel and fashion",
				"sales"
			],
			"job_types": [
				"Entry",
				"part time"
			],
			"location": "Olgiate Olona",
			"created_at": 1638006722
		},
		{
			"slug": "sprzedawcamagazynier-jysk-poznan-komorniki-3800-pln-jysk-435302",
			"company_name": "JYSK",
			"title": "Sprzedawca/Magazynier JYSK Poznań Komorniki (3800 pln)",
			"description": "",
			"remote": false,
			"url": "https://arbeitnow.com/view/sprzedawcamagazynier-jysk-poznan-komorniki-3800-pln-jysk-435302",
			"tags": [
				"Retail",
				"customer service"
			],
			"job_types": [
				"Associate",
				"full time"
			],
			"location": "Poznań",
			"created_at": 1638006722
		}
	],
	"links": {
		"first": "https://arbeitnow.com/api/job-board-api?page=1",
		"last": null,
		"prev": null,
		"next": "https://arbeitnow.com/api/job-board-api?page=2"
	},
	"meta": {
		"current_page": 1,
		"from": 1,
		"path": "https://arbeitnow.com/api/job-board-api",
		"per_page": 100,
		"to": 100,
		"terms": "This is a free public API for jobs, please do not abuse. I would appreciate linking back to the site. By using the API, you agree to the terms of service present on Arbeitnow.com",
		"info": "Jobs are updated every hour and order by the `created_at` timestamp. Use `?page=` to paginate. Read more information here: https://arbeitnow.com/blog/job-board-api"
	}
}

*/