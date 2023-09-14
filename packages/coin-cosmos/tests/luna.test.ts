import { base} from '@okxweb3/crypto-lib';
import {
    getNewAddress,
    validateAddress,
    sendToken,
    amount2Coin,
    amount2StdFee,
    amount2Coins,
    sendIBCToken,
    sendAminoMessage,
    sendMessages,
    GammRegistry,
    GammAminoConverters, AtomWallet
} from '../src';

describe("luna", () => {
    test("address", async () => {
        const prefix = "cosmos"
        const privateKey = base.randomBytes(32)
        console.log(privateKey.toString('hex'))
        const address = getNewAddress(privateKey, prefix)
        console.info(address)

        const v = validateAddress(address, prefix)
        console.info(v)
    });

    test("sendToken", async () => {
        const demon = "uluna"
        const privateKey = "ebc42dae1245fad403bd18f59f7283dc18724d2fc843b61e01224b9789057347"
        const pk = base.fromHex(privateKey)
        const v = await sendToken(pk,
          "bombay-12",
          4,
          588053,
          "terra1xmkczk59xgjhzgwhfg8l5tgs2uftpuj9cgazr4",
          "terra1vm9pfph4syf9g3hfz29636cfw5wp9n6xwut8xu",
          amount2Coins(demon, 10000),
          amount2StdFee(demon, 2000, 100000),
          0,
          "test",
        )
        console.info(v)
        expect(v).toStrictEqual("CpUBCowBChwvY29zbW9zLmJhbmsudjFiZXRhMS5Nc2dTZW5kEmwKLHRlcnJhMXhta2N6azU5eGdqaHpnd2hmZzhsNXRnczJ1ZnRwdWo5Y2dhenI0Eix0ZXJyYTF2bTlwZnBoNHN5ZjlnM2hmejI5NjM2Y2Z3NXdwOW42eHd1dDh4dRoOCgV1bHVuYRIFMTAwMDASBHRlc3QSZwpQCkYKHy9jb3Ntb3MuY3J5cHRvLnNlY3AyNTZrMS5QdWJLZXkSIwohA/ed1wKaWQXlV5BhQrDFfsIfR0XxKbjAV67M9C4nULpuEgQKAggBGAQSEwoNCgV1bHVuYRIEMjAwMBCgjQYaQJHtpCP8lR0lyC+S97GrMJSnjmHCfomESW//iLEr8HVXKsekP5TM4rG2lPPjckZeZ+wAFgUgSDxj1ZzdVTzwtsA=")
    });

    test("sendIBCTransfer", async () => {
        const demon = "uosmo"
        const privateKey = "ebc42dae1245fad403bd18f59f7283dc18724d2fc843b61e01224b9789057347"
        const pk = base.fromHex(privateKey)
        const v = await sendIBCToken(
          pk,
          "osmosis-1",
          2,
          584406,
          "osmo1lyjxk4t835yj6u8l2mg6a6t2v9x3nj7ulaljz2",
          "cosmos1rvs5xph4l3px2efynqsthus8p6r4exyr7ckyxv",
          amount2Coin(demon, 100000),
          "transfer",
          "channel-0",
          amount2StdFee(demon, 0, 100000),
          0,
          undefined,
          Math.ceil(Date.now() / 1000) + 300,
        )
        console.info(v)
    });

    test("sendMessage", async () => {
        const demon = "uosmo"
        const privateKey = "ebc42dae1245fad403bd18f59f7283dc18724d2fc843b61e01224b9789057347"
        const pk = base.fromHex(privateKey)
        const v = await sendMessages(
          pk,
          "osmosis-1",
          2,
          584406,
          [],
          amount2StdFee(demon, 0, 100000),
        )
        console.info(v)
    });

    test("osmosis-json", async () => {
        const data = "{\n  \"chain_id\": \"osmosis-1\",\n  \"account_number\": \"584406\",\n  \"sequence\": \"1\",\n  \"fee\": {\n    \"gas\": \"250000\",\n    \"amount\": [\n      {\n        \"denom\": \"uosmo\",\n        \"amount\": \"0\"\n      }\n    ]\n  },\n  \"msgs\": [\n    {\n      \"type\": \"osmosis/gamm/swap-exact-amount-in\",\n      \"value\": {\n        \"sender\": \"osmo1lyjxk4t835yj6u8l2mg6a6t2v9x3nj7ulaljz2\",\n        \"routes\": [\n          {\n            \"poolId\": \"722\",\n            \"tokenOutDenom\": \"ibc/6AE98883D4D5D5FF9E50D7130F1305DA2FFA0C652D1DD9C123657C6B4EB2DF8A\"\n          }\n        ],\n        \"tokenIn\": {\n          \"denom\": \"uosmo\",\n          \"amount\": \"10000\"\n        },\n        \"tokenOutMinAmount\": \"3854154180813018\"\n      }\n    }\n  ],\n  \"memo\": \"\"\n}"
        const privateKey = base.fromHex("ebc42dae1245fad403bd18f59f7283dc18724d2fc843b61e01224b9789057347")
        const prefix = "osmo"
        const  tt = await sendAminoMessage(privateKey, prefix, data, GammAminoConverters, GammRegistry)
        console.info(tt)
    });
});

describe("evmos", () => {
    test("address", async () => {
        const prefix = "evmos"
        const privateKey = base.fromHex("ebc42dae1245fad403bd18f59f7283dc18724d2fc843b61e01224b9789057347")
        const address = getNewAddress(privateKey, prefix, true)
        console.info(address)

        const v = validateAddress(address, prefix)
        console.info(v)
    });

    test("sendToken", async () => {
        const demon = "aevmos"
        const privateKey = "ebc42dae1245fad403bd18f59f7283dc18724d2fc843b61e01224b9789057347"
        const pk = base.fromHex(privateKey)
        const v = await sendToken(pk,
            "evmos_9001-2",
            5,
            2091572,
            "evmos1yc4q6svsl9xy9g2gplgnlpxwhnzr3y73wfs0xh",
            "evmos1yc4q6svsl9xy9g2gplgnlpxwhnzr3y73wfs0xh",
            amount2Coins(demon, 10000000000000000),
            amount2StdFee(demon, 3500000000000000, 140000),
            0,
            "",
            true,
        )
        console.info(v)
    });

    test("sendIBCTransfer", async () => {
        const demon = "aevmos"
        const privateKey = "ebc42dae1245fad403bd18f59f7283dc18724d2fc843b61e01224b9789057347"
        const pk = base.fromHex(privateKey)
        const v = await sendIBCToken(
            pk,
            "evmos_9001-2",
            4,
            2091572,
            "evmos1yc4q6svsl9xy9g2gplgnlpxwhnzr3y73wfs0xh",
            "cosmos1rvs5xph4l3px2efynqsthus8p6r4exyr7ckyxv",
            amount2Coin(demon, 10000000000000000),
            "transfer",
            "channel-3",
            amount2StdFee(demon, 5000000000000000, 200000),
            0,
            undefined,
            Math.ceil(Date.now() / 1000) + 300,
            "",
            true
        )
        // curl -X POST -d '{"tx_bytes":"CpwBCpkBChwvY29zbW9zLmJhbmsudjFiZXRhMS5Nc2dTZW5kEnkKLGV2bW9zMXljNHE2c3ZzbDl4eTlnMmdwbGdubHB4d2huenIzeTczd2ZzMHhoEixldm1vczF5YzRxNnN2c2w5eHk5ZzJncGxnbmxweHdobnpyM3k3M3dmczB4aBobCgZhZXZtb3MSETEwMDAwMDAwMDAwMDAwMDAwEn0KWQpPCigvZXRoZXJtaW50LmNyeXB0by52MS5ldGhzZWNwMjU2azEuUHViS2V5EiMKIQOcJMA96W11QpNEacdGblBLXYYIw5nd27SBSxlh+Pc6UxIECgIIARgFEiAKGgoGYWV2bW9zEhAzNTAwMDAwMDAwMDAwMDAwEODFCBpBybt+ODmw1NzqBrFEKeBtwicmBLZBD/nTJY86vqT2LjRfs2ebbO+oSk8tlle6e0jHlheujkP38qTzpFa9lNnORQE=","mode":"BROADCAST_MODE_SYNC"}' https://lcd-evmos.whispernode.com/cosmos/tx/v1beta1/txs
        console.info(v)
    });
});

describe("sei", () => {
    test("address", async () => {
        const prefix = "sei"
        const privateKey = base.fromHex("ebc42dae1245fad403bd18f59f7283dc18724d2fc843b61e01224b9789057347")
        const address = getNewAddress(privateKey, prefix)
        console.info(address)

        const v = validateAddress(address, prefix)
        console.info(v)
    });

    test("sendToken", async () => {
        const demon = "usei"
        const privateKey = "ebc42dae1245fad403bd18f59f7283dc18724d2fc843b61e01224b9789057347"
        const pk = base.fromHex(privateKey)
        const v = await sendToken(pk,
            "atlantic-2",
            1,
            4050874,
            "sei1s95zvpxwxcr0ykdkj3ymscrevdam7wvs24dk57",
            "sei1urdedeej0fd4kslzn3uq6s8mndh8wt7usk6a4z",
            amount2Coins(demon, 100000),
            amount2StdFee(demon, 1000, 100000),
            0,
            ""
        )
        if( v !== "CosBCogBChwvY29zbW9zLmJhbmsudjFiZXRhMS5Nc2dTZW5kEmgKKnNlaTFzOTV6dnB4d3hjcjB5a2RrajN5bXNjcmV2ZGFtN3d2czI0ZGs1NxIqc2VpMXVyZGVkZWVqMGZkNGtzbHpuM3VxNnM4bW5kaDh3dDd1c2s2YTR6Gg4KBHVzZWkSBjEwMDAwMBJmClAKRgofL2Nvc21vcy5jcnlwdG8uc2VjcDI1NmsxLlB1YktleRIjCiECWzs64TTLQ3sGP88eAUtzXoHtGHUYauDmYZWgBLyYUesSBAoCCAEYARISCgwKBHVzZWkSBDEwMDAQoI0GGkAPt3BsqAL807wgpPtKQdF8mYsPwM52HjRaScsc27rIdh30d6JxWnu9Zy1Tm9funsAYIOtStq7GKTfekctaIRK/") {
            console.info(v)
        }
    });

    test("sendIBCTransfer", async () => {
        const demon = "usei"
        const privateKey = "ebc42dae1245fad403bd18f59f7283dc18724d2fc843b61e01224b9789057347"
        const pk = base.fromHex(privateKey)
        const v = await sendIBCToken(
            pk,
            "atlantic-2",
            10,
            4050874,
            "sei1s95zvpxwxcr0ykdkj3ymscrevdam7wvs24dk57",
            "osmo1lyjxk4t835yj6u8l2mg6a6t2v9x3nj7ulaljz2",
            amount2Coin(demon, 1000),
            "transfer",
            "channel-89",
            amount2StdFee(demon, 1000, 100000),
            0,
            undefined,
            Math.ceil(Date.now() / 1000) + 300,
            ""
        )
        // curl -X POST -d '{"tx_bytes":"CrkBCrYBCikvaWJjLmFwcGxpY2F0aW9ucy50cmFuc2Zlci52MS5Nc2dUcmFuc2ZlchKIAQoIdHJhbnNmZXISCWNoYW5uZWwtNxoMCgR1c2VpEgQxMDAwIipzZWkxczk1enZweHd4Y3IweWtka2ozeW1zY3JldmRhbTd3dnMyNGRrNTcqLWF4ZWxhcjFydnM1eHBoNGwzcHgyZWZ5bnFzdGh1czhwNnI0ZXh5cjZrcXZkZDiA9Ofjmd6ksRcSZgpQCkYKHy9jb3Ntb3MuY3J5cHRvLnNlY3AyNTZrMS5QdWJLZXkSIwohAls7OuE0y0N7Bj/PHgFLc16B7Rh1GGrg5mGVoAS8mFHrEgQKAggBGAYSEgoMCgR1c2VpEgQxMDAwEKCNBhpAoLCuHtNe5N1/awOucEB9ZGfxlC4JriSXBL9oNa0HKiId741gOW/52phhnQbstHx32z9/Zj5sd2BqnkShLR8tbg==","mode":"BROADCAST_MODE_SYNC"}' https://rest.atlantic-2.seinetwork.io/cosmos/tx/v1beta1/txs
        console.info(v)
    });
});