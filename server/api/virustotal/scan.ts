export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  // Fetch user input
  const query = getQuery(event);
  const input = query.input as string;

  // Check if input is IP or domain
  const regexIpv4 = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;
  const regexIpv6 = /^((?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}|(?:[0-9A-Fa-f]{1,4}:){1,7}:|:(?::[0-9A-Fa-f]{1,4}){1,7}|(?:[0-9A-Fa-f]{1,4}:){1,6}:[0-9A-Fa-f]{1,4}|(?:[0-9A-Fa-f]{1,4}:){1,5}(?::[0-9A-Fa-f]{1,4}){1,2}|(?:[0-9A-Fa-f]{1,4}:){1,4}(?::[0-9A-Fa-f]{1,4}){1,3}|(?:[0-9A-Fa-f]{1,4}:){1,3}(?::[0-9A-Fa-f]{1,4}){1,4}|(?:[0-9A-Fa-f]{1,4}:){1,2}(?::[0-9A-Fa-f]{1,4}){1,5}|[0-9A-Fa-f]{1,4}:(?:(?::[0-9A-Fa-f]{1,4}){1,6})|:(?:(?::[0-9A-Fa-f]{1,4}){1,6}))$/;
  const regexDomain = /(([a-zA-Z]{1})|([a-zA-Z]{1}[a-zA-Z]{1})|([a-zA-Z]{1}[0-9]{1})|([0-9]{1}[a-zA-Z]{1})|([a-zA-Z0-9][a-zA-Z0-9-_]{1,61}[a-zA-Z0-9]))\.([a-zA-Z]{2,6}|[a-zA-Z0-9-]{2,30}\.[a-zA-Z]{2,3})/;

  const isIp = regexIpv4.test(input) || regexIpv6.test(input);
  const isDomain = regexDomain.test(input);

  // Extract domain from URL if input is complete URL instead of domain
  let extractedDomain;
  let arr;
  if (isDomain) {
    arr = regexDomain.exec(input);
    extractedDomain = arr![0];
  }

  /* VIRUSTOTAL */
  const vtEndpoint = isIp
    ? `https://www.virustotal.com/api/v3/ip_addresses/${input}`
    : `https://www.virustotal.com/api/v3/domains/${extractedDomain}`;

  const vtOptions = {
    method: "GET",
    headers: {
      "accept": "application/json",
      "x-apikey": config.VT_API_KEY,
    }
  };

  const vtRes = await fetch(vtEndpoint, vtOptions);

  const vtRaw = await vtRes.json();
  const attr = vtRaw?.data?.attributes;

  const stats = attr?.last_analysis_stats;
  const flags = stats.malicious;
  const total = stats.malicious + stats.suspicious + stats.undetected + stats.harmless;

  const vtOutput = isIp
    ? `>> VirusTotal: ${flags}/${total} flags | AS ${attr.asn} (${attr.as_owner}) | ${attr.country}`
    : `>> VirusTotal: ${flags}/${total} flags | Registrar: ${attr.registrar}`;

  /* AbuseIPDB */
  const abdbEndpoint = new URL("https://api.abuseipdb.com/api/v2/check");
  abdbEndpoint.searchParams.set("ipAddress", input);
  abdbEndpoint.searchParams.set("verbose", "");

  const abdbOptions = {
    method: "GET",
    headers: {
      accept: "application/json",
      Key: config.ABDB_API_KEY,
    }
  };

  const abdbRes = isIp ? await fetch(abdbEndpoint.toString(), abdbOptions) : null;
  const abdbRaw = await abdbRes?.json();
  const abdbData = abdbRaw?.data;

  const abdbOutput = abdbRes != null
    && `>> AbuseIPDB: Confidence Score: ${abdbData.abuseConfidenceScore}% | Usage: ${abdbData.usageType} | ${abdbData.countryName} | ISP: ${abdbData.isp}`;

  const finalOutput = isIp
    ? `OSINT results on "${input}":\n${vtOutput}\n${abdbOutput}`
    : `OSINT results on "${input}":\n${vtOutput}`;

  return { finalOutput };
});
