export type ServicePlan =
  | 'free'
  | 'starter'
  | 'starter_plus'
  | 'standard'
  | 'standard_plus'
  | 'pro'
  | 'pro_plus'

export type ServiceRegion = 'oregon' | 'frankfurt'

export type ServiceDisk = {
  id: string
  name: string
}

export type ServicePort = {
  port: number
  protocol: string
}

export type ServiceBase = {
  id: string
  ownerId: string
  slug: string
  name: string
  repo: string
  branch: string
  autoDeploy: boolean
  notifyOnFail: 'default' | 'notify' | 'ignore'
  suspended: boolean
  suspenders: Array<string>
  createdAt: Date
  updatedAt: Date
}

export type DockerService = {
  env: 'docker'
  envSpecificDetails: {
    dockerCommand: string
    dockerContext: string
    dockerfilePath: string
  }
}

export type NonDockerService = {
  env: string
  envSpecificDetails: {
    buildCommand: string
    startCommand: string
  }
}

export type BackgroundWorker = ServiceBase & {
  type: 'background_worker'
  serviceDetails: (DockerService | NonDockerService) & {
    numInstances: number
    plan: ServicePlan
    pullRequestPreviewsEnabled: boolean
    region: ServiceRegion
  }
}

export type CronJob = ServiceBase & {
  type: 'cron_job'
  serviceDetails: (DockerService | NonDockerService) & {
    lastSuccessfulRunAt: Date
    plan: ServicePlan
    region: ServiceRegion
    schedule: string
  }
}

export type PrivateService = ServiceBase & {
  type: 'private_service'
  serviceDetails: (DockerService | NonDockerService) & {
    numInstances: number
    plan: ServicePlan
    pullRequestPreviewsEnabled: boolean
    region: ServiceRegion
  }
}

export type StaticSite = ServiceBase & {
  type: 'static_site'
  serviceDetails: {
    buildCommand: string
    parentServer: StaticSite | null
    publishPath: string
    pullRequestPreviewsEnabled: boolean
    url: string
  }
}

export type WebService = ServiceBase & {
  type: 'web_service'
  serviceDetails: (DockerService | NonDockerService) & {
    numInstances: number
    plan: ServicePlan
    pullRequestPreviewsEnabled: boolean
    region: ServiceRegion
  }
}

export type Service =
  | BackgroundWorker
  | CronJob
  | PrivateService
  | StaticSite
  | WebService
