const API_URL = process.env.REACT_APP_API_URL;

export async function getTrips(token) {
  const response = await fetch(`${API_URL}/trip/read`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}

export async function createTrip(data, token) {
  const response = await fetch(`${API_URL}/trip/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function getTripById(id, token) {
  const response = await fetch(`${API_URL}/trip/read/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Cannot get trips details");
  }

  return data;
}

export async function deleteTrip(id, token) {
  const response = await fetch(`${API_URL}/trip/delete/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },});
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Cannot get trips details");
  }

  return data;
}

export async function updateTrip(id,data,token) {
  const response = await fetch(`${API_URL}/trip/update/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const output = await response.json();


  if (!response.ok) {
    throw new Error(data.message || "Cannot get trips details");
  }

  return output;
}
