import axios from "axios";

export const setSplunk = (headers: any, error: any) => {
  const data = JSON.stringify({
    event: {
      data: error,
      browser: headers,
    },
    sourcetype: "manual",
  });
  return axios({
    method: "POST",
    url: `http://192.168.110.40:8088/services/collector`,
    headers: {
      Authorization:
        process.env.NEXT_PUBLIC_ENV === "production"
          ? "Splunk cbd9b991-5abf-47c9-8c23-a7078a9a2ad6"
          : "Splunk 583d1144-0b01-40f6-b608-2e851de87360",
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((res) => res.data)
    .catch((err) => err);
};
