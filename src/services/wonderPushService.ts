"use server";

type NotificationData = {
  title: string;
  text?: string;
  url?: string;
  imageUrl?: string;
  icon?: string;
  actionButtons?: Array<{ 
    label: string; 
    action: string;
    TargetUrl: string;
    icon: string; }>;
  targetSegmentIds?: string[];
  priority?: string;
};

type FetchOptions = {
  method: string;
  headers: Record<string, string>;
  body?: string;
};

const cleanObject = (obj: Record<string, any>): Record<string, any> => {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, value]) =>
        value !== null &&
        value !== undefined &&
        (typeof value !== "string" || value.trim() !== "") &&
        (typeof value !== "object" || (Array.isArray(value) ? value.length !== 0 : Object.keys(value).length !== 0))
      )
      .map(([key, value]) => [key, (typeof value === "object" && value !== null) ? cleanObject(value) : value])
  );
};

export const createNotification = async ( data: NotificationData): Promise<void> => {
  const cleanedData = cleanObject({
    notification: {
      alert: {
        title: data.title,
        text: data.text,
        targetUrl: data.url,
        web: {
          image: data.imageUrl,
          icon: data.icon,
          buttons: data.actionButtons,
        },
      },
    },
    targetSegmentIds: data.targetSegmentIds,
    push: {
      priority: data.priority,
    },
  });

  const options: FetchOptions = {
    method: "POST",
    headers: {
      accept: "text/plain",
      "content-type": "application/json",
    },
    body: JSON.stringify(cleanedData),
  };

  console.log({ ...cleanedData });
  console.log(JSON.stringify({ ...cleanedData }));
  

  try {
    const response = await fetch(`${process.env.API_WONPUSH}/deliveries?accessToken=${process.env.TOKEN_WPUSH}`, options);
    if (!response.ok) {
        console.log({response});
      throw new Error(`HTTP error! Status: ${response.status}`);
      
    }
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getNotifications = async (): Promise<any[]> => {
  const options: FetchOptions = {
    method: "GET",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
  };

  try {
    const response = await fetch(`${process.env.API_WONPUSH}/notifications?sort=-creationDate&accessToken=${process.env.TOKEN_WPUSH}`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export const deleteNotification = async (id: string): Promise<void> => {
  const options: FetchOptions = {
    method: "DELETE",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
  };

  try {
    const response = await fetch(`${process.env.API_WONPUSH}/notifications/${id}?accessToken=${process.env.TOKEN_WPUSH}`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getSegments = async (): Promise<any[]> => {
  const options: FetchOptions = { method: "GET", headers: { accept: "application/json" } };
  
  try {
    const response = await fetch(`${process.env.API_WONPUSH}/segments?accessToken=${process.env.TOKEN_WPUSH}`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
