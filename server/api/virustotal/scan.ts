export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const query = getQuery(event);
  const input = query.input as string;

  const regexIpv4 = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;
  const regexIpv6 = /^((?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}|(?:[0-9A-Fa-f]{1,4}:){1,7}:|:(?::[0-9A-Fa-f]{1,4}){1,7}|(?:[0-9A-Fa-f]{1,4}:){1,6}:[0-9A-Fa-f]{1,4}|(?:[0-9A-Fa-f]{1,4}:){1,5}(?::[0-9A-Fa-f]{1,4}){1,2}|(?:[0-9A-Fa-f]{1,4}:){1,4}(?::[0-9A-Fa-f]{1,4}){1,3}|(?:[0-9A-Fa-f]{1,4}:){1,3}(?::[0-9A-Fa-f]{1,4}){1,4}|(?:[0-9A-Fa-f]{1,4}:){1,2}(?::[0-9A-Fa-f]{1,4}){1,5}|[0-9A-Fa-f]{1,4}:(?:(?::[0-9A-Fa-f]{1,4}){1,6})|:(?:(?::[0-9A-Fa-f]{1,4}){1,6}))$/;
  const regexDomain = /(([a-zA-Z]{1})|([a-zA-Z]{1}[a-zA-Z]{1})|([a-zA-Z]{1}[0-9]{1})|([0-9]{1}[a-zA-Z]{1})|([a-zA-Z0-9][a-zA-Z0-9-_]{1,61}[a-zA-Z0-9]))\.([a-zA-Z]{2,6}|[a-zA-Z0-9-]{2,30}\.[a-zA-Z]{2,3})/;

  const isIp = regexIpv4.test(input) || regexIpv6.test(input);
  const isDomain = regexDomain.test(input);

  let extractedDomain;
  let arr;
  if (isDomain) {
    arr = regexDomain.exec(input);
    extractedDomain = arr![0];
  }

  const endpoint = isIp
    ? `https://www.virustotal.com/api/v3/ip_addresses/${input}`
    : `https://www.virustotal.com/api/v3/domains/${extractedDomain}`;

  const options = {
    method: "GET",
    headers: {
      "accept": "application/json",
      "x-apikey": config.VT_API_KEY,
    }
  };

  const res = await fetch(endpoint, options);

  const raw = await res.json();
  const attr = raw?.data?.attributes;

  const stats = attr?.last_analysis_stats;
  const flags = stats.malicious + stats.suspicious;
  const total = stats.malicious + stats.suspicious + stats.undetected + stats.harmless;

  const output = isIp
    ? `>> VirusTotal: ${flags}/${total} flags | AS ${attr.asn} (${attr.as_owner}) | ${attr.country}`
    : `>> VirusTotal: ${flags}/${total} flags | Registrar: ${attr.registrar}`;

  const finalOutput = `OSINT results on "${input}":\n${output}`;

  return { raw, finalOutput };
});
