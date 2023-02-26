from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.jobstores.sqlalchemy import SQLAlchemyJobStore
from . import job

scheduler = BackgroundScheduler(jobstores={'default': SQLAlchemyJobStore(url='sqlite:///jobs.sqlite')})

def start():
    scheduler.add_job(job.createTokens, 'interval', minutes=1, replace_existing=True, id='create_tokens', name='create_tokens')
    scheduler.start()
