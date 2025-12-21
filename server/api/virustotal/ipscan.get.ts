export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const query = getQuery(event);
  const ip = query.ip as string;

  const options = {
    method: "GET",
    headers: {
      "accept": "application/json",
      "x-apikey": config.VT_API_KEY,
    }
  };

  const res = await fetch(`https://www.virustotal.com/api/v3/ip_addresses/${ip}`, options);

  const raw = await res.json();
  const attr = raw?.data?.attributes;

  const stats = attr?.last_analysis_stats;
  const flags = stats.malicious + stats.suspicious;
  const total = stats.malicious + stats.suspicious + stats.undetected + stats.harmless;

  const output = `>> VirusTotal: ${flags}/${total} flags | AS ${attr.asn} (${attr.as_owner}) | ${attr.country}`;

  return { raw, output };
});
