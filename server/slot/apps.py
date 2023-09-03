from django.apps import AppConfig


class SlotConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'slot'

    def ready(self):
        from jobs.sched import start
        start()
        return super().ready()
