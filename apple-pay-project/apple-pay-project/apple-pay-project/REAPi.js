import Passkit


func addtoWallet (kban: String) {

    let pass = PKPass(data: kban.data(using: .utf8)!, error: nil)
    let passLibrary = PKPASSLibrary()
    passLibrary.addPasses([pass], withCompletionHandler: { (success, error) in

        if success {
            print("K/BAN added to wallet successfully.")
	} else {
	    print("Failed to add K/BAN to Wallet: \(String(describing: error))")
        }

    })

}
 