describe('Testing the "/api/v1/question/ai" endpoint', () => {
	it('Should connect to the API endpoint and return a 200 status', async () => {
		const response = await fetch('http://localhost:3000/api/v1/question/ai')
		expect(response.status).toBe(200)
	})
    it('Should return 10 AI generated questions when performing a GET request to the API endpoint and the amount query is more than 10', async () => {
        const response = await fetch('http://localhost:3000/api/v1/question/ai/?amount=12');
        const data = await response.json();
        expect(data.results).toHaveLength(10);  // Check if 10 results are returned
      }, 30000);
})
