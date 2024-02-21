# This function retrieves vulnerability information from a specified API endpoint.
def api_get_vulns(image, tag, registry, cve, page, pagesize, severities, namespaces, digest=None, suppr=False, scope=None):
    # The global keyword is used to indicate that the variable 'token' is a global variable.
    global token

    # If the token is not set, authenticate to get a token.
    if not token:
        token = authenticate()

    # Initialize the parameters string.
    params = ""

    # Get the server endpoint from the environment variables.
    server = environ.get('CSP_ENDPOINT')

    # Construct the base URL for the API request.
    base_url = "{server}/api/v2/risks/vulnerabilities?include_vpatch_info={include_vpatch_info}&show_negligible={show_negligible}&page={page}&pagesize={pagesize}&skip_count={skip_count}&hide_base_image={hide_base_image}".format(
        server=server, include_vpatch_info="true", show_negligible="true", page=page, pagesize=pagesize,
        skip_count="true", hide_base_image="false")

    # Add parameters to the URL based on the function arguments.
    if image:
        if tag:
            params += "&image_name={image}:{tag}&image_name_exact_match={image_name_exact_match}".format(image=image, tag=tag, image_name_exact_match="true")
        else:
            params += "&image_name={image}&image_name_exact_match={image_name_exact_match}".format(image=image, image_name_exact_match="false")
    elif tag:
        params += "&image_name=:{tag}&image_name_exact_match={image_name_exact_match}".format(tag=tag, image_name_exact_match="false")
    if registry:
        params += "&registry_name={registry}".format(registry=registry)
    if digest:
        params += "&digest={digest}".format(digest=digest)
    if suppr:
        params += "&acknowledge_status={acknowledge_status}".format(acknowledge_status="true")
    if cve:
        params += "&text_search={text_search}".format(text_search=cve)
    if scope:
        params += "&scope={scope}".format(scope=scope)
    if severities:
        params += "&severities={severities}".format(severities=severities)
    if namespaces:
        params += "&namespace_names={namespaces}".format(namespaces=namespaces)

    # Construct the final API URL.
    api_url = base_url + params

    # If verbose mode is enabled, print the API URL.
    if verbose:
        print(api_url)

    # Set the Authorization header with the token.
    headers = {'Authorization': f'Bearer {token}'}

    # Send a GET request to the API URL.
    res = requests.get(url=api_url, headers=headers, verify=False)

    # If the response status code is 502 or 401, re-authenticate.
    if res.status_code == 502 or res.status_code == 401:
        token = authenticate()
        if verbose:
            print("Token expired. Authenticating")

    # Return the response.
    return res
