from django.conf import settings
from django.db import models
from django.utils import timezone


class CPU_usage(models.Model):
    percentage = models.FloatField()
    check_date = models.DateTimeField(blank=True, null=True)

    def publish(self):
        self.check_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title