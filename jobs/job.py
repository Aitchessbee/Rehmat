from agora_token_builder import RtcTokenBuilder
from django.conf import settings
import random, time
from datetime import datetime, timedelta

from slot.models import ScheduledSlot

def createToken(slot):
    channelName = f"{slot.doctor.name}_{slot.patient.name}_{slot.time}"
    uid = random.randint(0, 230)
    expirationTimeSeconds = 3600 * 24
    currentTime = time.time()
    role = 1
    privilegeExpiresTs = currentTime + expirationTimeSeconds

    token = RtcTokenBuilder(settings.AGORA_APP_ID, settings.AGORA_CERTIFICATE, channelName, uid, role, privilegeExpiresTs)

    slot.token = token
    slot.channel = channelName

    slot.save()

def createTokens():
    slots = ScheduledSlot.objects.filter(time__lte=datetime.now()+timedelta(minutes=10), token='').all()
    for slot in slots:
        createToken(slot)
