import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import WidgetApi from '../../src/Modules/WidgetApi';

describe('fetchData(param)', () => {
    test('call axios.get() and return correct promise', () => {
        var mock = new MockAdapter(axios);
        mock.onGet(/.*Verify\/ApplyApiToken.*/).reply(200, {
            Token: "123",
            ApiUrl: "apiurl"
        });
        mock.onGet(/.*apiurl\/testingurl.*/).reply(200, {
            Msg: "Hello"
        });

        WidgetApi.fetchData({
            IsCrossSite: true,
            Url: "/testingurl"
        })
            .then((response) => {
                expect(response.data).toEqual({
                    Msg: "Hello"
                });
            });
    });
});