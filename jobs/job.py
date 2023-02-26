from agora_token_builder import RtcTokenBuilder
from django.conf import settings
import random, time
from datetime import datetime, timedelta

from slot.models import ScheduledSlot

def createToken(slot):
    channelName = f"{slot.doctor.name}_{slot.patient.name}_{slot.time.strftime('YYYY-MM-DD')}"
    uid1 = random.randint(0, 230)
    uid2 = (uid1 + 1) % 230
    expirationTimeSeconds = 3600 * 24
    currentTime = time.time()
    role = 1
    privilegeExpiresTs = currentTime + expirationTimeSeconds

    token1 = RtcTokenBuilder.buildTokenWithUid(settings.AGORA_APP_ID, settings.AGORA_CERTIFICATE, channelName, uid1, role, privilegeExpiresTs)
    token2 = RtcTokenBuilder.buildTokenWithUid(settings.AGORA_APP_ID, settings.AGORA_CERTIFICATE, channelName, uid2, 0, privilegeExpiresTs)
    print(token1, token2)
    slot.token1 = token1
    slot.token2 = token2
    slot.channel = channelName
    slot.uid1 = uid1
    slot.uid2 = uid2

    slot.save()

def createTokens():
    slots = ScheduledSlot.objects.filter(time__lte=datetime.now()+timedelta(minutes=10), token1='').all()
    for slot in slots:
        createToken(slot)
