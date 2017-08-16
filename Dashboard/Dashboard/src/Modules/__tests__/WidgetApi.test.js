import axios from 'axios';
import WidgetApi from '../WidgetApi';

jest.mock('axios');

describe('_getAuthToken(action)', () => {
    [undefined, '', null].forEach(tokenUrl => {
        test(`use default token url when window.TokenUrl is "${tokenUrl}"`, () => {
            // assign
            axios
                .get
                .mockReset();
            window.TokenUrl = tokenUrl;

            // action
            WidgetApi._getAuthToken('fake action');

            // assert
            expect(axios.get.mock.calls[0][0]).toMatch(/^http:\/\/ha\.nexdev\.net:7611\/LAP\/12bet\/Verify\/ApplyApiToken\?type=1&actionLink=fake%20action&_=\d+$/);

        });
    });

    test('get data via pre-registed token url', () => {
        // assign
        axios
            .get
            .mockReset();
        window.TokenUrl = 'http://some-url/?action={0}';

        // action
        WidgetApi._getAuthToken('fake action');

        // assert
        expect(axios.get.mock.calls[0][0]).toMatch(/^http:\/\/some\-url\/\?action=fake%20action$/);
    });
});

describe('fetchData(param)', () => {
    describe('Data of param is null', () => {
        afterEach(() => {
            axios
                .get
                .mockReset();
        });

        test('axios.get function should be called with correct parameter', () => {
            // assign
            window.HostUrl = undefined;
            const param = { Data: null };

            // action
            WidgetApi.fetchData(param);

            // assert
            expect(axios.get).toBeCalledWith('http://ha.nexdev.net:7611/LAP/12bet', { params: {} });
        });
    });

    describe('Not cross site: ', () => {
        const fakeParams = {
            Data: {
                any: 123.456
            },
            Url: '/fake/url',
            IsCrossSite: false
        };

        afterEach(() => {
            axios
                .get
                .mockReset();
        });

        [undefined, '', null].forEach(hostUrl => {
            test(`use default host url when window.HostUrl is "${hostUrl}"`, () => {
                // assign
                window.HostUrl = hostUrl;

                // action
                WidgetApi.fetchData(fakeParams);

                // assert
                expect(axios.get).toBeCalledWith('http://ha.nexdev.net:7611/LAP/12bet', { params: fakeParams.Data });
            });
        });

        test('has window.HostUrl then replace SessionIsAlive by given url', () => {
            // assign
            window.HostUrl = 'http://fake-url/SessionIsAlive';

            // action
            WidgetApi.fetchData(fakeParams);

            // assert
            expect(axios.get).toBeCalledWith(`http://fake-url/${fakeParams.Url}`, { params: fakeParams.Data });
        });
    });

    describe('cross site', () => {
        const fakeParams = {
            Data: {
                any: 456.789
            },
            Url: '/fake/url',
            IsCrossSite: true
        };
        const fakeResponse = {
            data: {
                Token: 'abc xyz',
                ApiUrl: '/fake/api'
            }
        };
        const _getAuthToken = WidgetApi._getAuthToken;
        afterEach(() => {
            WidgetApi._getAuthToken = _getAuthToken;
            axios
                .get
                .mockReset();
        });

        test('get auth token', () => {
            // assign
            WidgetApi._getAuthToken = jest.fn(() => Promise.resolve(fakeResponse));

            // action
            WidgetApi.fetchData(fakeParams);

            // assert
            expect(WidgetApi._getAuthToken).toBeCalledWith(fakeParams.Url);
        });
        test('after get auth token get data by given url', () => {
            // assign
            const promise = Promise.resolve(fakeResponse);
            WidgetApi._getAuthToken = jest.fn(() => promise);

            // action
            WidgetApi.fetchData(fakeParams);

            promise.then(() => {
                const params = Object.assign({
                    'X-Auth-Token': 'abc xyz'
                }, fakeParams.Data);

                expect(axios.get).toBeCalledWith('/fake/api/fake/url', { params: params });
            });
        });
    })
});