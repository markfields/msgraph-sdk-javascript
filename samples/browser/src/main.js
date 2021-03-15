window.addEventListener(
	"load",
	() => {
		init();
	},
	false,
);

let client;
const init = async () => {
	const scopes = ["user.read", "profile", "User.ReadWrite", "Files.Read", "Files.Read.All", "Files.ReadWrite", "Files.ReadWrite.All", "Mail.Read", "Mail.ReadWrite", "Mail.Send"];
	const msalConfig = {
		auth: {
			clientId: Secrets.clientId,
			redirectUri: "http://localhost:8080",
		},
	};
	var tokenCred = new sample.Sample();
	var auth = new MicrosoftGraph.TokenCredentialAuthProvider.TokenCredentialAuthenticationProvider(tokenCred, { scopes: scopes });
	var msalApplication = new Msal.UserAgentApplication(msalConfig);
	const msalOptions = new ms.MSALAuthenticationProviderOptions(scopes);
	const msalProvider = new ms.ImplicitMSALAuthenticationProvider(msalApplication, msalOptions);
	client = MicrosoftGraph.Client.initWithMiddleware({
		debugLogging: true,
		authProvider: auth,
	});

	bindEvents();
};

const bindEvents = () => {
	let requestsDOM = document.getElementById("requests");
	requestsDOM.addEventListener("click", (elem, event) => {
		let id = elem.srcElement.getAttribute("cell");
		switch (id) {
			case "1":
				request
					.getUserDetails()
					.then((res) => {
						ui.updateOutput(res);
					})
					.catch((error) => {
						ui.updateOutput(error);
					});
				break;

			case "2":
				request
					.getMyDriveFiles()
					.then((res) => {
						ui.updateOutput(res);
					})
					.catch((error) => {
						ui.updateOutput(error);
					});
				break;

			case "3":
				request
					.getMyMails()
					.then((res) => {
						ui.updateOutput(res);
					})
					.catch((error) => {
						ui.updateOutput(error);
					});
				break;

			case "4":
				break;
		}
	});
};
