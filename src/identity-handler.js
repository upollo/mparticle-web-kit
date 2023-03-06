/*
The 'mParticleUser' is an object with methods get user Identities and set/get user attributes
Partners can determine what userIds are available to use in their SDK
Call mParticleUser.getUserIdentities() to return an object of userIdentities --> { userIdentities: {customerid: '1234', email: 'email@gmail.com'} }
For more identity types, see http://docs.mparticle.com/developers/sdk/javascript/identity#allowed-identity-types
Call mParticleUser.getMPID() to get mParticle ID
For any additional methods, see http://docs.mparticle.com/developers/sdk/javascript/apidocs/classes/mParticle.Identity.getCurrentUser().html
*/

/*
identityApiRequest has the schema:
{
  userIdentities: {
    customerid: '123',
    email: 'abc'
  }
}
For more userIdentity types, see http://docs.mparticle.com/developers/sdk/javascript/identity#allowed-identity-types
*/

function upTrack(mParticleUser, eventType, upClient) {
  const ids = mParticleUser.getUserIdentities();
  const email = ids.userIdentities.email;
  const userId = ids.userIdentities.customerid;
  const phone = ids.userIdentities.mobile_phone;
  if (upClient && (email || userId || phone)) {
    const userInfo = { userEmail: email, userId: userId, userPhone: phone };
    upClient.track(userInfo, eventType);
  }
}

function IdentityHandler(common) {
  this.common = common || {};
}
IdentityHandler.prototype.onUserIdentified = function (mParticleUser) {};
IdentityHandler.prototype.onIdentifyComplete = function (
  mParticleUser,
  identityApiRequest
) {
  const eventType = 16; // EVENT_TYPE_HEARTBEAT
  upTrack(mParticleUser, eventType, this.common.upClient);
};
IdentityHandler.prototype.onLoginComplete = function (
  mParticleUser,
  identityApiRequest
) {
  const eventType = 1; // login
  upTrack(mParticleUser, eventType, this.common.upClient);
};
IdentityHandler.prototype.onLogoutComplete = function (
  mParticleUser,
  identityApiRequest
) {};
IdentityHandler.prototype.onModifyComplete = function (
  mParticleUser,
  identityApiRequest
) {};

/*  In previous versions of the mParticle web SDK, setting user identities on
    kits is only reachable via the onSetUserIdentity method below. We recommend
    filling out `onSetUserIdentity` for maximum compatibility
*/
IdentityHandler.prototype.onSetUserIdentity = function (
  forwarderSettings,
  id,
  type
) {};

module.exports = IdentityHandler;
