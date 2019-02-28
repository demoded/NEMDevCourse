import {Account, AccountHttp, NEMLibrary, NetworkTypes, Password, SimpleWallet, Mosaic} from "nem-library";

NEMLibrary.bootstrap(NetworkTypes.TEST_NET);

export const MOSAIC_NAME = 'demodedcoin'

export const createSimpleWallet = (password: string):SimpleWallet => {
   const pass = new Password(password);
   return SimpleWallet.create(`${MOSAIC_NAME}-wallet`, pass);
};

export const getAccountBalances = (account: Account): Promise<Array<Mosaic>> => {
    return new Promise<Array<Mosaic>>((resolve, reject) => {
        const accountHttp = new AccountHttp();
        accountHttp.getMosaicOwnedByAddress(account.address).subscribe(mosaics => {
            resolve(mosaics);

        }, err => {
            reject(err);
        });
    });
};

export const mosaicBalance = (balances: Array<Mosaic>): number => {
    const found = balances.find((mosaic) => {
        return mosaic.mosaicId.name === MOSAIC_NAME;
    });
    if (!found) return 0;
    return found.quantity;
};

export const xemBalance = (balances: Array<Mosaic>): number => {
    const xemMosaic = balances.find((mosaic) => {
        return mosaic.mosaicId.name === 'xem';
    });
    if (!xemMosaic) return 0;
    return xemMosaic.quantity;
};

//////////////////////////
/// some training code ///
//////////////////////////
// const firstWallet = createSimpleWallet('12mysimplewallet48');
//
// console.log(firstWallet);
//
// const myAccount = firstWallet.open(new Password('12mysimplewallet48'));
//
// console.log(myAccount);

// test to get transactions
// const accountHttp = new AccountHttp();
// accountHttp.allTransactions(new Address('TBUBJGNYPKH75FINV6NBCQUVNKIARXRTJDXYSPC3'))
// .subscribe(allTransactions => {
//     console.log(allTransactions);
// })


