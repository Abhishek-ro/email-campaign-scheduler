
const cron = require('node-cron');
const Campaign = require('../models/Campaign'); 
const { sendEmail } = require('../services/emailService')

const startScheduler = () => {
    cron.schedule('*/1 * * * *', async () => {
        console.log(`[Scheduler] Checking for campaigns due at ${new Date().toISOString()}`);

        try {
            
            const campaignsToSend = await Campaign.find({
                status: 'pending',
                scheduledTime: { $lte: new Date() } 
            });

            if (campaignsToSend.length === 0) {
                
                return;
            }

            console.log(`[Scheduler] Found ${campaignsToSend.length} campaign(s) to process.`);

            for (const campaign of campaignsToSend) {
                console.log(`[Scheduler] Processing campaign: "${campaign.campaignName}" (ID: ${campaign._id})`);

                
                for (const recipientEmail of campaign.emailsToSend) {
                    try {
                        await sendEmail({
                            to: recipientEmail,
                            subject: `Campaign: ${campaign.campaignName}`,
                            text: `Hello,\n\nThis is an email for your campaign: "${campaign.campaignName}".\n\nBest regards,\nYour Campaign Team`
                        });
                        console.log(`[Scheduler] Sent email for "${campaign.campaignName}" to ${recipientEmail}`);
                    } catch (emailError) {
                        console.error(`[Scheduler] Failed to send email for "${campaign.campaignName}" to ${recipientEmail}:`, emailError.message);
                       
                    }
                }

              
                campaign.status = 'sent';
                campaign.sentAt = new Date();
                await campaign.save();
                console.log(`[Scheduler] Campaign "${campaign.campaignName}" marked as sent.`);
            }

        } catch (error) {
            console.error('[Scheduler] Error during campaign processing:', error);
        }
    });

    console.log('[Scheduler] Campaign scheduler started.');
};

module.exports = startScheduler;