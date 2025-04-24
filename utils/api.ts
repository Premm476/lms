export const fetchData = async (url: string, options: RequestInit = {}) => {
    // Ensure credentials are included to send cookies for authentication
    const response = await fetch(url, { credentials: 'include', ...options });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
