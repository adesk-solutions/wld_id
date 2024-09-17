import { ISuccessResult } from '@worldcoin/idkit';

const handleVerify = async (proof: ISuccessResult) => {
    const res = await fetch("/api/verify", { // route to your backend will depend on implementation
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(proof),
    })
    
    const data = await res.json();

    if (res.ok) {
        // Set sessionStorage item on success
        console.log('test 3');
        //sessionStorage.setItem('crowdfunding_loggedin', 'true');
        // Handle success (e.g., navigate to a different page or show a success message)
    } else if (res.status === 400 && data.redirect) {
        // Redirect if customer is already verified
        console.log('test 4');
        console.log(res);
        //res.headers.set('Set-Cookie', 'crowdfunding_loggedin=true; Path=/; HttpOnly; SameSite=None; Secure');

        //sessionStorage.setItem('crowdfunding_loggedin', 'true');

        //window.location.href = data.redirect;
    } else {
        // Handle other errors
        throw new Error("Verification failed."); // IDKit will display the error message to the user in the modal
    }
};
export default handleVerify;
