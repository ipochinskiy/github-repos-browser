interface MockedRequest {
  accepts: jest.Mock;
}

export const mockRequest = (): MockedRequest => ({
  accepts: jest.fn(),
});

interface MockedResponse {
  headersSent: boolean;
  status: jest.Mock;
  json: jest.Mock;
}

export const mockResponse = (): MockedResponse => {
  const response = {} as MockedResponse;
  response.headersSent = false,
  response.status = jest.fn().mockReturnValue(response);
  response.json = jest.fn().mockReturnValue(response);
  return response;
};
