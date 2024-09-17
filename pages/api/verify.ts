import { NextApiRequest, NextApiResponse } from 'next';
import { type IVerifyResponse, verifyCloudProof } from '@worldcoin/idkit';
import mysql from 'mysql2/promise';

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crowdfunding_db',
});


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') { // Ensure it's a POST request
        const proof = req.body;
        const app_id = "app_staging_2f2709de046e97d0a27204edfa0cb044";
        const action = "sign-up-staging";

        try {
            const verifyRes = (await verifyCloudProof(proof, app_id, action)) as IVerifyResponse;
            if (verifyRes.success) {
                console.log('proof ' , proof);
                    // Extract user_id from proof object
                const user_id = 1; // Ensure this field exists in the proof object

                if (!user_id) {
                    return res.status(400).json({ message: "user_id is required" });
                }

                // Generate a session token
                const sessionToken = Math.random().toString(36).substring(2);

                // Store session information in the database
                const [result] = await pool.query(
                    'INSERT INTO crowdfunding_users (user_id, logged_in) VALUES (?, ?)',
                    [user_id, 1]
                );
                // Set cookies on success
                res.setHeader('Set-Cookie', [
                    `session_token=${user_id}; Path=/; HttpOnly; SameSite=None; Secure`,
                    `crowdfunding_loggedin=true; Path=/; SameSite=None; Secure`
                ]);
                                console.log('test 1');
                return res.status(200).send(verifyRes);
            } else {
                if (verifyRes.code === 'max_verifications_reached') {
                    
                    console.log('proof ' , proof);
                      // Extract user_id from proof object
                const user_id = 1; // Ensure this field exists in the proof object

                if (!user_id) {
                    return res.status(400).json({ message: "user_id is required" });
                }

                // Generate a session token
                const sessionToken = Math.random().toString(36).substring(2);

                 // Store session information in the database
                 const [result] = await pool.query(
                    'INSERT INTO crowdfunding_users (user_id, logged_in) VALUES (?, ?)',
                    [user_id, 1]
                );

                 // Set cookies on success
                 res.setHeader('Set-Cookie', [
                    `session_token=${user_id}; Path=/; HttpOnly; SameSite=None; Secure`,
                    `crowdfunding_loggedin=true; Path=/; SameSite=None; Secure`
                ]);

                    console.log('test 2');
                    return res.status(400).json({ redirect: 'http://localhost:5173' });
                }
                return res.status(400).send(verifyRes);
            }
        } catch (error) {
            return res.status(500).json({ message: "Internal server error", error });
        }
    } else {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
}
